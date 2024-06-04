<?php

namespace App\Http\Controllers;

use App\Models\DeliveryGuySchedule;
use Inertia\Inertia;
use App\Models\Order;
use Illuminate\Http\Request;


class OrderController extends Controller
{
    public function update(Request $request, string $id)
    {
        $order = Order::find($id);
        $order->update($request->all());
    }
}
