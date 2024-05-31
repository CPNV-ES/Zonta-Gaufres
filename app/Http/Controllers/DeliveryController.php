<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Order;
use Illuminate\Http\Request;

class DeliveryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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

    private function formatOrders()
    {
        $orders = Order::with('address.city', 'articles', 'buyer')->get();
        $formattedOrders = [];

        foreach ($orders as $order) {
            $address = [
                'streetNumber' => $order->address[0]->street_number,
                'city' => $order->address[0]->city->name,
                'postalCode' => $order->address[0]->city->zip_code,
                'street' => $order->address[0]->street,
            ];

            $order = [
                'id' => $order->id,
                'address' => $address,
                'buyer' => $order->buyer->firstname . ' ' . $order->buyer->lastname,
                'quantity' => $order->articles[0]->pivot->quantity,
                'deliveryGuy' => $order->delivery_guy,
                'EndDelivery' => (new \DateTime($order->end_delivery_time))->format('H:i'),
                'startDelivery' => (new \DateTime($order->start_delivery_time))->format('H:i'),
                'enterprise' => $order->enterprise,
            ];

            array_push($formattedOrders, $order);
        }

        return $formattedOrders;
    }

    /**
     * Show the form for editing the specified resource.
     */

    public function editAll()
    {
        return Inertia::render('DeliveriesEdit', [
            'initOrders' => $this->formatOrders(),
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
