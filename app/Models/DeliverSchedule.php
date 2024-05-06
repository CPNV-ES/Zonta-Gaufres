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
        return $this->belongsToMany(City::class);
    }
}
