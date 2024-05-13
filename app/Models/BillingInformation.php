<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BillingInformation extends Model
{
    use HasFactory;
    //TODO: remove after the BillingInfromations table is rename in migration
    protected $table = 'billing_informations';
    public function people(): BelongsTo
    {
        return $this->belongsTo(People::class);
    }
}
