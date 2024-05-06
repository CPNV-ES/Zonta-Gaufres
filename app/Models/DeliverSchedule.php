<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DeliverSchedule extends Model
{
    public function people()
    {
        return $this->belongsTo(People::class);
    }
    public function city()
    {
        return $this->belongsToMany(City::class, 'deliver_schedule_cities', 'deliver_schedules_id', 'city_id');
    }
    public function order()
    {
        return $this->hasMany(Order::class, 'deliver_schedule');
    }
}
