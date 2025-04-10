<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use App\Enums\PersonTypesEnum;
use App\Enums\PaymentTypesEnum;
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

    public function getFullnameAttribute()
    {
        return $this->firstname . ' ' . $this->lastname;
    }

    public function personType(): BelongsToMany
    {
        return $this->belongsToMany(PersonType::class);
    }
    public function orders()
    {
        return $this->hasMany(Order::class, 'buyer_id');
    }
    public function contacts()
    {
        return $this->hasMany(Order::class, 'contact_id');
    }
    public function deliveryGuySchedule()
    {
        return $this->hasMany(DeliveryGuySchedule::class, 'person_id');
    }
    public function newCollection(array $models = [])
    {
        return new PersonCollection($models);
    }
}

class PersonCollection extends Collection
{


    public function generateSheetPDF()
    {
        $pdf = App::make('dompdf.wrapper');

        $html = '<body style="font-family: Arial, sans-serif; font-size:14px";>';

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
                    <th>Entreprises</th>
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
        $schedulePersonOrder = $person->deliveryGuySchedule()
            ->with('order')
            ->get();
        $personOrder = $schedulePersonOrder->pluck('order');
        $orders = $personOrder->first(); // should get all orders from the person (as delivery guy)


        if (!($orders)) {
            return "
                        <tr>
                            <td colspan='11' style='text-align:center;'>Aucune commande trouvée pour $person->fullname</td>
                        </tr>
                    </table>
                </div>";
        }



        $countQuantity = $orders->sum('waffle_quantity') ?? "";
        $totalPrice = $orders->sum('waffle_quantity') * 2 ?? "";
        $totalPriceToCash = 0;

        $html = '';
        foreach ($orders as $order) {
            $order->load('buyer', 'contact', 'address.city', 'paymentType');

            $paymentType = PaymentTypesEnum::fromCase(case: $order->paymentType->name);

            $buyer = $order->buyer->fullname;
            $contact = $order->contact->fullname;
            $address = $order->address->street;
            $zip_code = $order->address->city->zip_code;
            $city = $order->address->city->name;
            $remark = $order->remark;
            $real_delivery_time = $order->real_delivery_time;
            $waffle_quantity = $order->waffle_quantity;

            $payment_types = $paymentType->toArray();
            $payment_type = $payment_types['name'];

            $price = $order->waffle_quantity * 2;
            $pricePerUnit = number_format($price / $waffle_quantity, 2, thousands_separator: ' ');

            if ($payment_type == 'Livraison') {
                $priceToCash = $price;
                $payment_type = "L";
                $totalPriceToCash += $priceToCash;
                $background = "#FFFFCC";
            } else {
                $priceToCash = "-";
                $background = "#FFFFFF";
                if ($payment_type == 'Facture') $payment_type = "F";
                else {
                    $payment_type = "E";
                }
            }



            $html .= "
            <?php foreach($orders as $order): ?>
                        <tr style='background-color: $background'>
                            <td>$buyer</td>
                            <td>$contact</td>
                            <td>$address</td>
                            <td>$zip_code</td>
                            <td>$city</td>
                            <td>$remark</td>
                            <td>$real_delivery_time</td>
                            <td>$waffle_quantity</td>
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
