<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;
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
}
