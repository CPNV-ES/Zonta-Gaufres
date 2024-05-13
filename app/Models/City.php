<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class City extends Model
{
    use HasFactory;
    public function address()
    {
        return $this->hasMany(Address::class);
    }
    public function deliverSchedule()
    {
        return $this->belongsToMany(DeliverSchedule::class, 'deliver_schedule_cities', 'deliver_schedules_id', 'city_id');
    }

}
