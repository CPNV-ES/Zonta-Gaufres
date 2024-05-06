<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class People extends Model
{

    public function peopleType(): BelongsToMany
    {
        return $this->belongsToMany(PeopleType::class);
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
