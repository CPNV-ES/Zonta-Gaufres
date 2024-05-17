<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Person extends Model
{
    use HasFactory;
    public function personType(): BelongsToMany
    {
        return $this->belongsToMany(PersonType::class);
    }
    public function orders()
    {
        return $this->hasMany(Order::class, 'buyer_id');
    }
    public function contacts()
    {
        return $this->hasMany(Order::class, 'contact_id');
    }
    public function billingInformation()
    {
        return $this->hasMany(BillingInformation::class);
    }
    public function deliverSchedule()
    {
        return $this->hasMany(DeliverSchedule::class, 'person_id');
    }
}
