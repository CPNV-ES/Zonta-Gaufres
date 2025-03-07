<?php

namespace App\Http\Controllers;

use App\Enums\InvoiceStatusEnum;
use App\Models\Invoice;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Controllers\strtolower;

class InvoiceController extends Controller
{
    public function index()
    {
        $invoices = Invoice::with('order', 'client')->get();

        $invoices->load('order.contact');

        $transformed = $invoices->map(function ($invoice) {

            $invoiceStatus = InvoiceStatusEnum::from($invoice->invoiceStatus->name);

            return [
                /*mettre les "values" dans chaque colonne*/
                "invoice_id" => $invoice->id,
                "company" => $invoice->client->company,
                "client" => $invoice->client->firstname . ' ' . $invoice->client->lastname,
                "total" => $invoice->order->total_price(),
                "status" => [
                    "key" => strtolower($invoiceStatus->name),
                    "name" => $invoiceStatus->displayName()
                ],
                "creation_date" => $invoice->created_at,
                "payment_date" => $invoice->payment_date,
                "contact" => $invoice->order->contact->firstname . ' ' . $invoice->order->contact->lastname,
            ];
        });

        return Inertia::render('Invoices/Index', [
            "invoices" => $transformed,
        ]);
    }


    public function printInvoice() {}
}
