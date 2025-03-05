<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Facades\App;
use DateTime;

class Order extends Model
{
    use HasFactory;
    protected $fillable = [
        'waffle_quantity',
        'date',
        'buyer_id',
        'contact_id',
        'address_id',
        'delivery_guy_schedule_id',
        'payment_type_id',
        'remark',
        'gifted_by',
        'start_delivery_time',
        'end_delivery_time',
        'real_delivery_time',
    ];

    public function total_price($price = 2)
    {
        return $this->waffle_quantity * $price;
    }

    public static function calculateTimeDifference($startTime, $endTime)
    {
        $time1 = new DateTime($startTime);
        $time2 = new DateTime($endTime);

        // Convert times to seconds since midnight
        $seconds1 = $time1->format('H') * 3600 + $time1->format('i') * 60 + $time1->format('s');
        $seconds2 = $time2->format('H') * 3600 + $time2->format('i') * 60 + $time2->format('s');

        // Calculate the difference in seconds, accounting for times spanning midnight
        if ($seconds2 < $seconds1) {
            $seconds2 += 24 * 3600; // Add 24 hours in seconds to the second time
        }

        $diffSeconds = $seconds2 - $seconds1;

        // Convert the difference back to hours, minutes, and seconds
        $hours = floor($diffSeconds / 3600);
        $minutes = floor(($diffSeconds % 3600) / 60);
        $seconds = $diffSeconds % 60;

        return sprintf('%02d:%02d:%02d', $hours, $minutes, $seconds);
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
    public function deliveryGuySchedule()
    {
        return $this->belongsTo(DeliveryGuySchedule::class);
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
        $fullname = $order->buyer->fullname;
        $address = $order->address->full;
        $gifted_by = $order->gifted_by;
        $waffle_quantity = $order->waffle_quantity;
        $number_of_packet = ceil($waffle_quantity / 5);
        $gifted_by = $gifted_by == null ? '' : "<span style='background-color: yellow;'>Offert par $gifted_by</span>";

        return "
            <table style='width: $percent%;'>
                <tr>
                    <td style='width: 150px;'>
                        <img src='/public/images/zonta_with_text.png' alt='Image' style='max-width: 165px;'>
                    </td>
                    <td colspan='3'>
                        <p>$company
                        <b>$fullname</b><br>
                        $address<br>
                        $gifted_by</p>
                    </td>
                </tr>
                <tr>
                    <td style='text-align: right;' colspan='3'><b>$waffle_quantity Gaufres</b></td>
                    <td style='text-align: right;' colspan='2'><b>$packet_index/$number_of_packet</b></td>
                </tr>
                <tr>
                    <td style='width:160px;'><b>Merci de votre soutien !</b></td>
                    <td style='text-align: right;'><img src='/public/images/social_network.png' alt='Image' style='max-width: 35px;'></td>
                    <td style='text-align: right;' colspan='2'>Suivez-nous !</td>
                </tr>
            </table>
        ";
    }
}