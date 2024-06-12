<?php

namespace App\Http\Controllers;

use App\Models\DeliveryGuySchedule;
use Inertia\Inertia;
use App\Models\Order;
use App\Enums\PaymentTypesEnum;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index()
    {

        $orders = Order::with('deliveryGuySchedule', 'contact', 'buyer', 'articles', 'paymentType')->get();

        $orders->load('deliveryGuySchedule.person');

        $transformed = $orders->map(function ($order) {
            $waffleQuantity = $order->articles[0]->pivot->quantity;

            $paymentType = PaymentTypesEnum::fromCase($order->paymentType->name);

            $order->load('address.city');

            return [
                "invoice_id" => $order->id,
                "company" => $order->contact->company,
                "client" => $order->buyer->firstname . ' ' . $order->buyer->lastname,
                "address" => $order->address[0]->street . ' ' . $order->address[0]->street_number,
                "zip_code" => $order->address[0]->city->zip_code,
                "city" => $order->address[0]->city->name,
                "note" => $order->remark,
                "gifted_by" => $order->gifted_by,
                "delivery_guy" => $order->deliveryGuySchedule->person->firstname . ' ' . $order->deliveryGuySchedule->person->lastname,
                "time_slot" => $order->deliveryGuySchedule->start_delivery_time_window . ' - ' . $order->deliveryGuySchedule->end_delivery_time_window,
                "contact" => $order->contact->firstname,
                "waffles_number" => $waffleQuantity,
                "total" => $waffleQuantity * $order->articles[0]->price,
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
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
