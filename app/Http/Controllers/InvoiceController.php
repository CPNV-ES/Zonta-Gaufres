<?php

namespace App\Http\Controllers;

use App\Enums\InvoiceStatusEnum;
use App\Models\Order;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\InvoiceStatus;

class InvoiceController extends Controller
{
    public function index()
    {
        $orders = Order::all();

        $transformed = $orders->map(function ($order) {
            return [
                /*mettre les "values" dans chaque colonne*/
                "id" => $order->id,
                "invoice_id" => $order->id,
                "company" => $order->buyer->company,
                "client" => $order->buyer->firstname . ' ' . $order->buyer->lastname,
                "total" => $order->total_price(),
                "status" => $order->invoiceStatus->enum()->toArray(),
                "creation_date" => $order->created_at,
                "payment_date" => $order->payment_date,
                "contact" => $order->contact->getFullnameAttribute(),
            ];
        });

        return Inertia::render('Invoices/Index', [
            "invoices" => $transformed,
        ]);
    }

    public function update($id, Request $request)
    {
        $order = Order::find($id);

        $order->status_id = InvoiceStatus::where('name', InvoiceStatusEnum::fromCase($request['status'])->name)->first()->id;
        $order->payment_date = $request['payment_date'];
        $order->save();
    }


    public function printInvoices(Request $request)
    {
        $invoices = Order::findMany(explode(',', $request->query('invoices')));
        return $invoices->generateInvoicesPDF()->download('invoices.pdf');
    }
}
