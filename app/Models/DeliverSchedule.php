<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DeliverSchedule extends Model
{
    public function person()
    {
        return $this->belongsTo(Person::class);
    }
    public function city()
    {
        return $this->belongsToMany(City::class, 'deliver_schedule_city');
    }
    public function order()
    {
        return $this->hasMany(Order::class);
    }
}
