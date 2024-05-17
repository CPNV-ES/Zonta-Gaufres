<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class City extends Model
{
    public function address()
    {
        return $this->hasMany(Address::class);
    }
    public function deliveryGuySchedule()
    {
        return $this->belongsToMany(DeliveryGuySchedule::class);
    }

}
