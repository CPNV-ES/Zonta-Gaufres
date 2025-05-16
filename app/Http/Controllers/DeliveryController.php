<?php

namespace App\Http\Controllers;

use App\Enums\PersonTypesEnum;
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
                'initDeliveries' => Order::hasDeliveryGuy()->with('buyer', 'address.city', 'deliveryGuy')->get()
            ]
        );
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function editAll()
    {
        return Inertia::render('Delivery/Edit', [
            'initOrders' => Order::hasNoDeliveryGuy()->with('address.city', 'buyer')->get(),
            'deliveryGuys' => Person::hasType(PersonTypesEnum::DELIVERY_GUY)->with(['ordersToDeliver.address.city'])->get(),
        ]);
    }

    public function printLabels(Request $request)
    {
        $orders = Order::findMany(explode(',', $request->query('deliveries')));
        return $orders->generateLabelsPDF()->download('label.pdf');
    }
}
