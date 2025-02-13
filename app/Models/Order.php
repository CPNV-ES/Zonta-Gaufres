<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

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
