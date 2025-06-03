<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

use App\Enums\PaymentTypesEnum;

class PaymentTypes extends Model
{
    public $timestamps = false;
    use HasFactory;
    public function Order(): BelongsToMany
    {
        return $this->belongsToMany(Order::class);
    }

    public function enum(): PaymentTypesEnum
    {
        return PaymentTypesEnum::fromCase($this->name);
    }

    public function scopeFromEnum($query, PaymentTypesEnum $enum)
    {
        return $query->where('name', $enum->name);
    }
}
