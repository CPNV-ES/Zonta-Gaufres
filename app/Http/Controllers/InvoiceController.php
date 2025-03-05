<?php

namespace App\Http\Controllers;

use App\Enums\InvoiceStatusEnum;
use App\Models\Invoice;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InvoiceController extends Controller
{
    public function index()
    {
        $invoices = Invoice::with('order', 'client')->get();

        $transformed = $invoices->map(function ($invoice) {

            $InvoiceStatus = InvoiceStatusEnum::fromCase($invoice->status->name);

            return [
                /*mettre les "values" dans chaque colonne*/
                "invoice_id" => $invoice->id,
                "company" => $invoice->client->company,
                "client" => $invoice->client->firstname . ' ' . $invoice->client->lastname,
                "total" => $invoice->order->total_price(),
                "status" => [
                    "key" => strtolower($InvoiceStatus->name),
                    "name" => $InvoiceStatus->value
                ],
                "creation_date" => $invoice->created_at,
                "payment_date" => $invoice->payment_date,
                "contact" => $invoice->contact->firstname . ' ' . $invoice->contact->lastname,
            ];
        });

        return Inertia::render('Invoices/Index', [
            "invoices" => $transformed,
        ]);
    }


    public function printInvoice() {}
}
