<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\App;

class Invoice extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id',
        'client_id',
        'status_id',
        'total',
        'creation_date',
        'payment_date',
    ];

    public function order()
    {
        return $this->belongsTo(Order::class);
    }
    public function client()
    {
        return $this->belongsTo(Person::class);
    }
    public function invoiceStatus()
    {
        return $this->belongsTo(InvoiceStatus::class, "status_id");
    }
    public function newCollection(array $models = [])
    {
        return new InvoiceCollection($models);
    }
}

class InvoiceCollection extends \Illuminate\Database\Eloquent\Collection
{
    public function generateInvoicesPDF()
    {
        $pdf = App::make('dompdf.wrapper');
        $html = '<body font-family: Arial, sans-serif; font-size: 14px; margin-top: 150px;>';

        foreach ($this as $invoice) {
            $html .= $this->generateUpper($invoice, 50);
        }
        $html .= '</body>';

        $pdf->loadHTML($html);

        return $pdf;
    }

    private function generateUpper($invoice, $percent)
    {
        $total = $invoice->total;
        $date = $invoice->creation_date;
        $quantity = $invoice->order->waffle_quantity;
        $pricePerUnit = $total / $quantity;
        $company = $invoice->order->buyer->company != null ? $invoice->order->buyer->company . '<br>' : '';
        $fullname = $invoice->order->buyer->firstname . ' ' . $invoice->order->buyer->lastname;
        $address = $invoice->order->address->street . ' ' . $invoice->order->address->number;
        $city =  $invoice->order->address->city->zip_code . ' ' . $invoice->order->address->city->name;


        setlocale(LC_TIME, 'fr_FR.utf8', 'fra');

        $dateformat = utf8_encode(strftime('%e %B %Y', strtotime($date)));


        return "
        <div style='padding-top:200px; padding-left:400px '>
            $company
            $fullname<br>
            $address<br>
            $city
        </div>
        <div style='display:flex; flex-wrap:nowrap'>
            <div style='padding-top:75px; padding-left:75px;'>
                <p style='font-size:30px'>Facture gaufres - $dateformat</p>
                <p style='line-height:0.8'><b>Livraison de $quantity gaufres à CHF $pricePerUnit </b></p>
                <p style='line-height:3'><b><span><b>Un grand Merci de votre soutien </b></span> </b></p>
                <p>Avec nos meilleures salutations</p>
            </div>
            <div style='text-align:right; padding-right:125px'>
                <span><b>CHF $total</b></span>
            </div>
        </div>
        ";
    }

    private function generateLower($invoice, $percent)
    {

        $total = $invoice->total;
        $company = $invoice->order->buyer->company != null ? "<b>" . $invoice->order->buyer->company . '</b><br>' : '';
        $fullname = $invoice->order->buyer->firstname . ' ' . $invoice->order->buyer->lastname;
        $address = $invoice->order->address->street . ' ' . $invoice->order->address->number;
        $city =  $invoice->order->address->city->zip_code . ' ' . $invoice->order->address->city->name;
        $infoSupp = $invoice->order->remark != null ? "<b> " . $invoice->order->remark . '</b><br>' : '';

        return "



        ";
    }
}
