<?php

namespace App\Models;

use App\Enums\InvoiceStatusEnum;
use App\Enums\PaymentTypesEnum;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Facades\App;
use DateTime;

class Order extends Model
{
    use HasFactory;

    public static $pricePerUnit = 2;

    protected $fillable = [
        'waffle_quantity',
        'date',
        'buyer_id',
        'contact_id',
        'address_id',
        'delivery_guy_id',
        'payment_type_id',
        'remark',
        'gifted_by',
        'start_delivery_time',
        'end_delivery_time',
        'real_delivery_time',
        'total',
        'status_id',
        'payment_date',
        'free',
    ];

    public function scopeHasDeliveryGuy($query)
    {
        return $query->whereNotNull('delivery_guy_id');
    }

    public function scopeHasNoDeliveryGuy($query)
    {
        return $query->whereNull('delivery_guy_id');
    }

    public function total_price($price = null)
    {
        $price = $price ?? self::$pricePerUnit;
        return $this->waffle_quantity * $price;
    }

    public function buyer()
    {
        return $this->belongsTo(Person::class, 'buyer_id');
    }
    public function contact()
    {
        return $this->belongsTo(Person::class, 'contact_id');
    }
    public function address()
    {
        return $this->belongsTo(Address::class, 'address_id');
    }
    public function invoiceStatus()
    {
        return $this->belongsTo(InvoiceStatus::class, "status_id");
    }
    public function deliveryGuy()
    {
        return $this->belongsTo(Person::class);
    }
    public function paymentType()
    {
        return $this->belongsTo(PaymentTypes::class);
    }
    public function newCollection(array $models = [])
    {
        return new OrderCollection($models);
    }
}

class OrderCollection extends \Illuminate\Database\Eloquent\Collection
{
    public function generateLabelsPDF()
    {
        $pdf = App::make('dompdf.wrapper');
        $html = "<table style='width: 100%; font-family: Arial, sans-serif; font-size: 14px; margin-top: 15px;'><tr>";

        $total_index = 0;
        foreach ($this as $order) {
            $number_of_packet = ceil($order->waffle_quantity / 5);
            for ($packet_index = 1; $packet_index <= $number_of_packet; $packet_index++) {
                $html .= "<td style='width: 50%; height: 150px;'>";
                $html .= $this->generateLabel($order, $packet_index, $this->count() == 1 && $number_of_packet == 1 ? 50 : 95);
                $html .= "</td>";

                $total_index++;
                if ($total_index % 2 == 0) $html .= "</tr><tr>";
            }
        }
        $html .= "</tr></table>";

        $pdf->loadHTML($html);
        return $pdf;
    }

    private function generateLabel($order, $packet_index, $percent = 95)
    {
        $company = $order->buyer->company != null ? "<b>" . $order->buyer->company . '</b><br>' : '';
        $fullname = $order->buyer->company == $order->buyer->fullname ? "" : "<b>" . $order->buyer->fullname . "</b><br>";
        $address = $order->address->full;
        $gifted_by = $order->gifted_by;
        $waffle_quantity = $order->waffle_quantity;
        $number_of_packet = ceil($waffle_quantity / 5);
        $gifted_by = $gifted_by == null ? '' : "<span style='background-color: yellow;'>Offert par $gifted_by</span>";

        return "
            <table style='width: $percent%;'>
                <tr>
                    <td style='width: 120px;'>
                        <img src='/public/images/zonta_with_text.png' alt='Image' style='max-width: 135px;'>
                    </td>
                    <td colspan='4'>
                        <p>$company
                        $fullname
                        $address<br>
                        $gifted_by</p>
                    </td>
                </tr>
                <tr>
                    <td style='text-align: right;' colspan='3'><b>$waffle_quantity Gaufres</b></td>
                    <td style='text-align: right;' colspan='2'><b>$packet_index/$number_of_packet</b></td>
                </tr>
                <tr>
                    <td style='width:160px;' colspan='2'><b>Merci de votre soutien !</b></td>
                    <td style='text-align: right;' colspan='3'><img src='/public/images/social_network.png' alt='Image' style='max-width: 25px;'>Suivez-nous !</td>
                </tr>
            </table>
        ";
    }

    public function generateInvoicesPDF()
    {
        $pdf = App::make('dompdf.wrapper');
        $html = '<body style="font-family: Arial, sans-serif; font-size:14px";>';

        foreach ($this as $invoice) {
            $html .= $invoice->paymentType->enum() != PaymentTypesEnum::INVOICE ? $this->generateUpperWithLogo($invoice) : "";
            $html .= $this->generateUpper($invoice);
            $html .= $invoice->paymentType->enum() == PaymentTypesEnum::INVOICE ? $this->generateLower($invoice) : "";
            $html .= '<div style="page-break-after: always;"></div>';
        }
        $html .= '</body>';

        $pdf->loadHTML($html);

        return $pdf;
    }

    public function generateUpperWithLogo($invoice) 
    {
        return "
            <div>
                <img src='/public/images/zonta_with_text.png' alt='Image' style='max-width: 400px;'>
                <hr>
            </div>
        ";
    }

    private function generateUpper($invoice)
    {
        $total = number_format($invoice->total_price(), 2, thousands_separator: ' ');
        $date = $invoice->creation_date;
        $quantity = $invoice->waffle_quantity;
        $pricePerUnit = number_format($total / $quantity, 2, thousands_separator: ' ');
        $company = $invoice->buyer->company != null ? $invoice->buyer->company . '<br>' : '';
        $fullname = $invoice->buyer->fullname;
        $address = $invoice->address->street . ' ' . $invoice->address->number;
        $city =  $invoice->address->city->zip_code . ' ' . $invoice->address->city->name;
        $is_facture = $invoice->paymentType->enum() == PaymentTypesEnum::INVOICE ? "Facture gaufres" : "Quittance";


        setlocale(LC_TIME, 'fr_FR.utf8', 'fra');

        $dateformat = (new DateTime($date))->format('d F Y');
        //https://stackoverflow.com/questions/9067892/how-to-align-two-elements-on-the-same-line-without-changing-html work maybe ?

        return "
            <div style='padding-top:200px; padding-left:400px '>
                $company
                $fullname<br>
                $address<br>
                $city
            </div>
            <div style='padding-top:75px; padding-left:75px; float:left'>
                <p style='font-size:25px'>$is_facture - $dateformat</p>
                <p style='line-height:0.8'><b>Livraison de $quantity gaufres à CHF $pricePerUnit </b></p>
                <p style='line-height:3'><b><span><b>Un grand Merci de votre soutien </b></span> </b></p>
                <p>Avec nos meilleures salutations</p>
            </div>
            <div style='text-align:right; padding-right:115px; padding-top:170px; float:right '>
                <span><b>CHF $total</b></span>
            </div>
        ";
    }

    private function generateLower($invoice)
    {
        $total = number_format($invoice->total_price(), 2, thousands_separator: ' ');
        $company = $invoice->buyer->company != null ? "<b>" . $invoice->buyer->company . '</b><br>' : '';
        $fullname = $invoice->buyer->email;
        $address = $invoice->address->street . ' ' . $invoice->address->number;
        $city =  $invoice->address->city->zip_code . ' ' . $invoice->address->city->name;
        $infoSupp = $invoice->remark != null ? "<b> " . $invoice->remark . '</b><br>' : '';

        //html ici
        return '
            <div style="padding-top: 385px; margin-left:-45px; margin-bottom:-100px">
                <img src="/public/images/pdf_down.png" style="width: 108%; ">
            </div>
        ';
    }
}
