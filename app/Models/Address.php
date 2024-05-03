<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    public function addressType()
    {
        return $this->belongsToMany(AddressType::class, 'order_address');
    }
    public function orders()
    {
        return $this->belongsToMany(Order::class, 'order_address');
    }
}
