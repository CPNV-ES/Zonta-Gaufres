<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

class Address extends BaseModel
{
    use HasFactory;

    protected $fillable = [
        'street',
        'street_number',
        'country',
        'region',
        'city_id',
    ];

    public function orders()
    {
        return $this->hasMany(Order::class);
    }
    public function city()
    {
        return $this->belongsTo(City::class);
    }
}
