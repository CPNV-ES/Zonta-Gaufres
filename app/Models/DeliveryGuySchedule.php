<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DeliveryGuySchedule extends Model
{
    use HasFactory;
    public function person()
    {
        return $this->belongsTo(Person::class);
    }
    public function city()
    {
        return $this->belongsToMany(City::class, 'delivery_guy_schedule_city');
    }
    public function order()
    {
        return $this->hasMany(Order::class);
    }
}
