<?php

namespace App\Http\Controllers;

use App\Enums\PaymentTypesEnum;
use App\Models\Address;
use App\Models\DeliveryGuySchedule;
use App\Models\Order;
use App\Models\Person;
use App\Models\City;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;


class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::with('deliveryGuySchedule', 'contact', 'buyer', 'paymentType', 'address')->get();

        $orders->load('deliveryGuySchedule.person');
        $orders->load('address.city');

        $transformed = $orders->map(function ($order) {


            $paymentType = PaymentTypesEnum::fromCase($order->paymentType->name);

            $order->load('address.city');

            return [
                "invoice_id" => $order->id,
                "company" => $order->contact->company,
                "client" => $order->buyer->firstname . ' ' . $order->buyer->lastname,
                "address" => $order->address->street . ' ' . $order->address->street_number,
                "zip_code" => $order->address->city->zip_code,
                "city" => $order->address->city->name,
                "note" => $order->remark,
                "gifted_by" => $order->gifted_by,
                "delivery_guy" => $order->deliveryGuySchedule !== null ? $order->deliveryGuySchedule->person->firstname . ' ' . $order->deliveryGuySchedule->person->lastname : "",
                "time_slot" => $order->deliveryGuySchedule !== null ? $order->deliveryGuySchedule->start_delivery_time_window . ' - ' . $order->deliveryGuySchedule->end_delivery_time_window : "",
                "contact" => $order->contact->firstname,
                "waffles_number" => $order->waffle_quantity,
                "total" => $order->total_price(),
                "status" => [
                    "key" => "paid",
                    "name" => "Payée"
                ],
                "payment_type" => [
                    "key" => strtolower($paymentType->name),
                    "name" => $paymentType->value
                ]
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

        $address = Address::findOrCreate(array_merge($addressData, ['city_id' => $city->id]));

        $realDeliveryTime =  Order::calculateTimeDifference($orderData['start_delivery_time'], $orderData['end_delivery_time']);

        Order::create(array_merge($orderData, [
            'person_id' => $person->id,
            'address_id' => $address->id,
            'buyer_id' => $person->id,
            'payment_type_id' => PaymentTypesEnum::fromCase($orderData['payment'])->value,
            'contact_id' => $orderData['contact'],
            'real_delivery_time' => $realDeliveryTime,
        ]));

        return redirect()->route('orders.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $order = Order::find($id);
        $order->update($request->all());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    private function getContactPeopleNames()
    {
        $contactPeople = Person::with('personType')->whereHas('personType', function (Builder $query) {
            $query->where('person_types.id', 2);
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
