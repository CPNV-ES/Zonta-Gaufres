<?php

namespace App\Http\Controllers;

use App\Enums\PaymentTypesEnum;
use App\Models\Address;
use App\Models\Order;
use App\Models\Person;
use App\Models\City;
use App\Models\PaymentTypes;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Inertia\Inertia;


class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::with('contact', 'buyer', 'paymentType', 'address')->get();

        $orders->load('address.city');

        $transformed = $orders->map(function ($order) {


            $paymentType = PaymentTypesEnum::fromCase($order->paymentType->name);

            $order->load('address.city');

            return [
                "invoice_id" => $order->id,
                "company" => $order->buyer->company,
                "client" => $order->buyer->firstname . ' ' . $order->buyer->lastname,
                "address" => $order->address->street . ' ' . $order->address->street_number,
                "zip_code" => $order->address->city->zip_code,
                "city" => $order->address->city->name,
                "note" => $order->remark,
                "gifted_by" => $order->gifted_by,
                "time_slot" => "{$order->start_delivery_time} - {$order->end_delivery_time}",
                "contact" => $order->contact->firstname,
                "waffles_number" => $order->waffle_quantity,
                "total" => $order->total_price(),
                "status" => $order->invoiceStatus !== null ? $order->invoiceStatus->enum()->toArray() : [],
                "payment_type" => $paymentType->toArray(),
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
        $contactPeopleNames = $this->getContactPeopleNames();

        return Inertia::render('Orders/Create', [
            "contactPeopleNames" => $contactPeopleNames,
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

        $person = Person::findOrCreate($personData);

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
            'payment_type_id' => PaymentTypes::where('name', PaymentTypesEnum::fromCase($orderData['payment'])->name)->first()->id,
            'contact_id' => $orderData['contact'],
        ]));

        return redirect()->route('orders.index');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $order = Order::find($id);
        $order->update($request->all());
    }

    private function getContactPeopleNames()
    {
        $contactPeople = Person::with('personType')->whereHas('personType', function (Builder $query) {
            $query->where('person_types.id', 3);
        })->orderBy('lastname', 'asc')->get();

        $contactPeopleNames = [];

        foreach ($contactPeople as $contactPerson) {
            $contactPerson = [
                'id' => $contactPerson->id,
                'name' => $contactPerson->lastname . ' ' . $contactPerson->firstname
            ];
            array_push($contactPeopleNames, $contactPerson);
        }

        return $contactPeopleNames;
    }
}
