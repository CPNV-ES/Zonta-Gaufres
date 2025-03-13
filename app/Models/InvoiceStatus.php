<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class InvoiceStatus extends Model
{
    public $timestamps = false;
    use HasFactory;
    public function invoice(): BelongsToMany
    {
        return $this->belongsToMany(Invoice::class);
    }
}
