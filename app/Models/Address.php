<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    use HasFactory;
    public function orders()
    {
        return $this->hasMany(Order::class);
    }
    public function city()
    {
        return $this->belongsTo(City::class);
    }

    public function getFullAttribute()
    {
        return "{$this->street} {$this->number}, {$this->city->name}";
    }
}
