<?php

namespace App\Http\Controllers;

use App\Enums\PaymentTypesEnum;
use App\Models\Address;
use App\Models\Order;
use App\Models\Person;
use App\Models\City;
use App\Models\PaymentTypes;
use App\Models\PersonType;
use App\Enums\PersonTypesEnum;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;


class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::with('contact', 'buyer', 'paymentType', 'address')->get();

        $orders->load('address.city');

        $transformed = $orders->map(function ($order) {

            $paymentType = $order->paymentType->enum();

            $order->load('address.city');

            return [
                "invoice_id" => $order->id,
                "company" => $order->buyer->company,
                "client" => $order->buyer->fullname,
                "address" => $order->address->street . ' ' . $order->address->street_number,
                "zip_code" => $order->address->city->zip_code,
                "city" => $order->address->city->name,
                "note" => $order->remark,
                "gifted_by" => $order->gifted_by,
                "time_slot" => "{$order->start_delivery_time} - {$order->end_delivery_time}",
                "contact" => $order->contact->fullname ?? '',
                "waffles_number" => $order->waffle_quantity,
                "total" => $order->total_price(),
                "status" => $order->invoiceStatus !== null ? $order->invoiceStatus->enum()->toArray() : [],
                "payment_type" => $paymentType->toArray(),
                "free" => $order->free,
                "delivery_guy" => $order->deliveryGuy->fullname ?? '',
            ];
        });

        return Inertia::render('Orders/Index', [
            "orders" => $transformed,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Orders/Create', [
            "contactPeopleNames" => $this->getPeopleNames(PersonTypesEnum::STAFF),
            "clientPeople" => $this->getPeopleNames(PersonTypesEnum::CLIENT),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $orderData = $request->input('order');
        $personData = $request->input('person');
        $addressData = $request->input('deliveryAddress');

        $cityName = $addressData['city'];
        $zip = $addressData['npa'];

        $person = $this->handleBuyer($personData);


        $city = City::findOrCreate([
            'name' => $cityName,
            'zip_code' => $zip
        ]);

        unset($addressData['city'], $addressData['npa']);

        $address = Address::findOrCreate(array_merge($addressData, ['city_id' => $city->id]));


        Order::create(array_merge($orderData, [
            'person_id' => $person->id,
            'address_id' => $address->id,
            'buyer_id' => $person->id,
            'payment_type_id' => PaymentTypes::fromEnum(PaymentTypesEnum::fromCase($orderData['payment']))->first()->id,
            'contact_id' => $orderData['contact'],
        ]));

        return redirect()->route('orders.index');
    }


    public function edit(string $id)
    {
        $order = Order::find($id);

        $transformed = [
            "id" => $order->id,
            "waffle_quantity" => $order->waffle_quantity,
            "date" => $order->date,
            "select_user_id" => $order->buyer->id,
            "select_user_fullname" => $order->buyer->firstname . ' ' . $order->buyer->lastname,
            "contact_id" => $order->contact->id ?? '',
            "contact_fullname" => $order->contact->firstname . '' . $order->contact->lastname ?? '',
            "gifted_by" => $order->gifted_by,
            "street" => $order->address->street,
            "street_number" => $order->address->street_number,
            "complement" => $order->address->complement,
            "npa" => $order->address->city->zip_code,
            "city" => $order->address->city->name,
            "start_delivery_time" => $order->start_delivery_time,
            "end_delivery_time" => $order->end_delivery_time,
            "payment" => $order->paymentType->name,
            "remark" => $order->remark,
            "free" => $order->free,
        ];

        return Inertia::render('Orders/Create', [
            "contactPeopleNames" => $this->getPeopleNames(PersonTypesEnum::STAFF),
            "clientPeople" => $this->getPeopleNames(PersonTypesEnum::CLIENT),
            "order" => $transformed,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $order = Order::findOrFail($id);

        // Extract data from the request
        $orderData = $request->input('order');
        $personData = $request->input('person');
        $addressData = $request->input('deliveryAddress');

        // Reformat delivery times
        $this->formatDeliveryTimes($orderData);

        // Handle buyer (person)
        $person = $this->handleBuyer($personData);
        if ($person) {
            $order->buyer_id = $person->id;
        }

        // Handle city and address
        $city = $this->handleCityUpdate($addressData);
        $this->handleAddressUpdate($order, $addressData, $city);

        // Update contact if provided
        if (isset($orderData['contact'])) {
            $order->contact_id = $orderData['contact'];
        }

        // Update the order
        $order->update($orderData);

        return redirect()->route('orders.index');
    }

    private function getPeopleNames(PersonTypesEnum $personType)
    {
        $contactPeople = Person::hasType($personType)->orderBy('lastname', 'asc')->get();

        $contactPeopleNames = [];

        foreach ($contactPeople as $contactPerson) {
            $contactPerson = [
                'id' => $contactPerson->id,
                'name' => $contactPerson->fullname
            ];
            array_push($contactPeopleNames, $contactPerson);
        }

        return $contactPeopleNames;
    }

    public function destroy(string $id)
    {
        $order = Order::find($id);
        $order->delete();

        return redirect()->route('orders.index');
    }
    private function formatDeliveryTimes(array &$orderData): void
    {
        if (isset($orderData['start_delivery_time'])) {
            $orderData['start_delivery_time'] = Carbon::parse($orderData['start_delivery_time'])->format('H:i');
        }

        if (isset($orderData['end_delivery_time'])) {
            $orderData['end_delivery_time'] = Carbon::parse($orderData['end_delivery_time'])->format('H:i');
        }
    }

    private function handleBuyer(array $personData): ?Person
    {
        if ($personData['select_user'] === "new") {
            $person = Person::create($personData);
            $person->personType()->attach(PersonType::fromEnum(PersonTypesEnum::CLIENT)->first());
            return $person;
        }

        return Person::find($personData['select_user']);
    }

    private function handleCityUpdate(array $addressData): City
    {
        return City::updateOrCreate([
            'name' => $addressData['city'],
            'zip_code' => $addressData['npa']
        ]);
    }

    private function handleAddressUpdate(Order $order, array &$addressData, City $city): void
    {
        $addressData['city_id'] = $city->id;
        unset($addressData['city'], $addressData['npa']);

        $order->address()->updateOrCreate(
            ['id' => $order->address->id ?? null],
            array_merge($addressData, ['complement' => $addressData['complement'] ?? ''])
        );
    }
}
