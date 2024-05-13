<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BillingInformation extends Model
{
    protected $table = 'billing_informations';
    public function person(): BelongsTo
    {
        return $this->belongsTo(Person::class);
    }
}
