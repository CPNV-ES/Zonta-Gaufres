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
        return Inertia::render(
            'Delivery/Index',
            [
                'initDeliveries' => Order::whereNotNull('real_delivery_time')->with('deliveryGuySchedule.person', 'buyer', 'address.city')->get()
            ]
        );
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function editAll()
    {
        return Inertia::render('Delivery/Edit', [
            'initOrders' => Order::with('address.city', 'buyer', 'deliveryGuySchedule.person')->get(),
            'deliveryGuys' => DeliveryGuySchedule::with('person', 'city', 'order.address.city')->get()
        ]);
    }

    public function printLabels(Request $request)
    {
        $orders = Order::findMany(explode(',', $request->query('deliveries')));
        return $orders->generateLabelsPDF()->download('label.pdf');
    }
}
