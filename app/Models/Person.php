<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use App\Enums\PaymentTypesEnum;
use App\Enums\PersonTypesEnum;
use Illuminate\Support\Facades\App;


class Person extends BaseModel
{
    use HasFactory;

    protected $fillable = [
        'firstname',
        'lastname',
        'email',
        'company',
        'phone_number',
        'remark',
    ];

    protected $appends = ['fullname'];

    public function scopeHasType($query, $type)
    {
        return $query->whereHas('personType', function ($q) use ($type) {
            $q->where('name', $type->name);
        });
    }

    public function getFullnameAttribute()
    {
        if ($this->firstname == null || $this->lastname == null) {
            return $this->email;
        }
        return $this->firstname . ' ' . $this->lastname;
    }

    public function personType(): BelongsToMany
    {
        return $this->belongsToMany(PersonType::class);
    }
    public function ordersToDeliver()
    {
        return $this->hasMany(Order::class, 'delivery_guy_id');
    }
    public function orders()
    {
        return $this->hasMany(Order::class, 'buyer_id');
    }
    public function contacts()
    {
        return $this->hasMany(Order::class, 'contact_id');
    }
    public function newCollection(array $models = [])
    {
        return new PersonCollection($models);
    }
    public function getTypesAttribute()
    {
        return $this->personType->map(function ($type) {
            return PersonTypesEnum::fromCase($type->name);
        });
    }
}

class PersonCollection extends Collection
{


    public function generateSheetPDF()
    {
        $pdf = App::make('dompdf.wrapper');

        $html = '
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
        </head>
        <body style="font-family: Arial, sans-serif; font-size:14px";>';

        foreach ($this as $person) {
            $html .= $this->generateTopTable($person, 50);
            $html .= $this->generateDataTable($person);
        }
        $html .= '</body>';

        $pdf->loadHTML($html);

        return $pdf;
    }

    private function generateTopTable($person, $percent)
    {
        $fullname = $person->fullname;

        return "
<style>
    table {
        border-collapse: collapse;
        width: 100%;
        table-layout: fixed; /* Ensures the table stays within the page bounds */
        word-wrap: break-word; /* Forces long text to wrap within cells */
        font-size: 10px

    }
    th, td {
        border: 1px solid black;
        padding: 4px;
        vertical-align: top;
    }
    th {
        background-color: #f2f2f2;
        text-align: center;
    }
    div.page {
        width: 100%;
        overflow: hidden; /* Prevents content from overflowing the page */
    }

</style>

        <div style='text-align: center; font-size: 26px; background-color: yellow; width: 100%'>
            $fullname
        </div>
        <br>
        <div style='page-break-after: always'>
            <table>
                <tr>
                    <th>Entreprise</th>
                    <th>Acheteur</th>
                    <th>Personne de contact</th>
                    <th>Adresse</th>
                    <th>NPA</th>
                    <th>Localité</th>
                    <th>Remarque</th>
                    <th>Hre livraison</th>
                    <th>Nbre gaufres</th>
                    <th>CHF =</th>
                    <th>L (livraison) ou F (facture) ou E (encaisé)</th>
                    <th>A encaisser à la livraison</th>
                </tr>
        ";
    }
    private function generateDataTable($person)
    {
        $orders = $person->ordersToDeliver()->get();

        if ($orders->isEmpty()) {
            return "
                        <tr>
                            <td colspan='11' style='text-align:center;'>Aucune commande trouvée pour $person->fullname</td>
                        </tr>
                    </table>
                </div>";
        }



        $countQuantity = $orders->sum('waffle_quantity') ?? "";
        $totalPrice = number_format($orders->where('free', 0)->sum('waffle_quantity') * 2 ?? "", 2, '.', '');
        $totalPriceToCash = 0;
        $pricePerUnit = Order::$pricePerUnit;

        $html = '';
        foreach ($orders as $order) {
            $order->load('buyer', 'contact', 'address.city', 'paymentType');

            $paymentType = PaymentTypesEnum::fromCase(case: $order->paymentType->name);

            $company = $order->buyer->company;
            $buyer = $order->buyer->fullname;
            $contact = $order->contact->fullname;
            $address = $order->address->street;
            $zip_code = $order->address->city->zip_code;
            $city = $order->address->city->name;
            $remark = $order->remark;
            $real_delivery_time = $order->real_delivery_time;
            $waffle_quantity = $order->waffle_quantity;

            $price = number_format($order->waffle_quantity * 2, 2, '.', '');

            $payment_types = $paymentType->toArray();
            $payment_type = $payment_types['name'];

            if ($order->free == 1) {
                $colorText = "red";
            } else {
                $colorText = "black";
            }

            if ($payment_type == 'Livraison') {
                $priceToCash = $price;
                $payment_type = "L";
                $totalPriceToCash += $priceToCash;
                $background = "#FFFFCC";
            } else {
                $priceToCash = "-";
                $background = "#FFFFFF";
                if ($payment_type == 'Facture')
                    $payment_type = "F";
                else {
                    $payment_type = "E";
                }
            }

            if ($order->free == 1) {
                $payment_type = " ";
                $totalPriceToCash = is_numeric($priceToCash) ? $totalPriceToCash - $priceToCash : $totalPriceToCash;
                $price = " ";
                $priceToCash = "-";
                $background = "#FFFFFF";
            }

            $totalPriceToCash = number_format($totalPriceToCash, 2, '.', '');
            //$priceToCash = $priceToCash == null ? " " : number_format($priceToCash, 2, '.', '');

            $html .= "
            <?php foreach($orders as $order): ?>
                        <tr style='background-color: $background'>
                            <td>$company</td>
                            <td>$buyer</td>
                            <td>$contact</td>
                            <td>$address</td>
                            <td>$zip_code</td>
                            <td>$city</td>
                            <td>$remark</td>
                            <td>$real_delivery_time</td>
                            <td  style='color:$colorText'>$waffle_quantity</td>
                            <td>$price</td>
                            <td>$payment_type</td>
                            <td>$priceToCash</td>
                        </tr>
                    <?php endforeach; ?>
            ";
        }
        $html .=
            "
                    <tr>
                        <td> <b>Totaux : </b> </td>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td style:colspan='3'><b>$countQuantity ($pricePerUnit)</b></td>
                        <td style:colspan='3'><b>$totalPrice</b></td>
                        <td style:colspan='3'></td>
                        <td style:colspan='3'><b>$totalPriceToCash</b></td>
                    </tr>
                </table>
                </div>";
        return $html;
    }
}
