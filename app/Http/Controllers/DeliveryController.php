<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\DeliveryGuySchedule;
use Illuminate\Http\Request;
use Inertia\Inertia;


class DeliveryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $orderWithDeliveryGuySchedule = Order::with(
            ['deliveryGuySchedule.person', 'buyer', 'articles', 'address.city']
        )->get();

        $deliveries = [];

        foreach ($orderWithDeliveryGuySchedule as $order) {
            $personId = $order->deliveryGuySchedule->person->id;
            $tripCountByDeliveryGuy = DeliveryGuySchedule::where('person_id', $personId)->count();

            $quantity = $order->articles[0]->pivot->quantity;
            $gaufresPerPackage = 5;
            $numberOfPackages = ceil($quantity / $gaufresPerPackage);

            $address = $order->address[0];

            $delivery = [
                'delivery_id' => $order->delivery_guy_schedule_id,
                'delivery_guy' => $order->deliveryGuySchedule->person->firstname . ' ' . $order->deliveryGuySchedule->person->lastname,
                'delivery_count' => $numberOfPackages,
                'trip_count' => $tripCountByDeliveryGuy,
                'address' => $address->street . ' ' . $address->street_number,
                'postal_code' => $address->city->zip_code,
                'locality' => $address->city->name,
                'phone_number' => $order->buyer->phone_number,
            ];

            $deliveries[] = $delivery;
        }

        return Inertia::render(
            'Deliveries',
            ['deliveries' => $deliveries]
        );
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
    public function editAll()
    {
        return Inertia::render('DeliveriesEdit', [
            'initOrders' => Order::with('address.city', 'articles', 'buyer', 'deliveryGuySchedule.person')->get(),
            'deliveryGuys' => DeliveryGuySchedule::with('person', 'city', 'order.articles', 'order.address.city')->get()
        ]);
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
