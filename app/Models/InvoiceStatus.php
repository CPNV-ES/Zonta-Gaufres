<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use App\Enums\InvoiceStatusEnum;

class InvoiceStatus extends Model
{
    public $timestamps = false;
    use HasFactory;
    public function order(): BelongsToMany
    {
        return $this->belongsToMany(Order::class);
    }
    public function enum(): InvoiceStatusEnum
    {
        return InvoiceStatusEnum::fromCase($this->name);
    }
}
