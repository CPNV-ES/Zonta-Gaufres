<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Person;


class DeliveryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render(
            'Delivery/Index',
            [
                'initDeliveries' => Order::whereNotNull('delivery_guy_id')->with('buyer', 'address.city', 'deliveryGuy')->get()
            ]
        );
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function editAll()
    {
        return Inertia::render('Delivery/Edit', [
            'initOrders' => Order::with('address.city', 'buyer')->whereNull("delivery_guy_id")->get(),
            'deliveryGuys' => Person::whereHas('personType', function ($query) {
                $query->where('name', 'DELIVERY_GUY');
            })->with(['ordersToDeliver.address.city'])->get(),
        ]);
    }

    public function printLabels(Request $request)
    {
        $orders = Order::findMany(explode(',', $request->query('deliveries')));
        return $orders->generateLabelsPDF()->download('label.pdf');
    }
}
