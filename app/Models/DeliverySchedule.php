<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DeliverySchedule extends Model
{
    use HasFactory;
    public function person()
    {
        return $this->belongsTo(Person::class);
    }
    public function city()
    {
        return $this->belongsToMany(City::class, 'delivery_schedule_city');
    }
    public function order()
    {
        return $this->hasMany(Order::class);
    }
}
