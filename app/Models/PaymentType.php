<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class PaymentType extends Model
{
    use HasFactory;
    public function Order(): BelongsToMany
    {
        return $this->belongsToMany(Order::class);
    }
}
