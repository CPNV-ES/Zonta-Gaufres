<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AddressType extends Model
{
    use HasFactory;
    public function addresses()
    {
        return $this->belongsToMany(Address::class, 'order_address');
    }
    public function orders()
    {
        return $this->belongsToMany(Order::class, 'order_address');
    }
}
