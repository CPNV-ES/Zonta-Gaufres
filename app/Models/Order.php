<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Order extends Model
{
    public function articles(): BelongsToMany
    {
        return $this->belongsToMany(Article::class, 'order_article')->withPivot('quantity');
    }

    public function buyer()
    {
        return $this->belongsTo(Person::class, 'buyer_id');
    }
    public function contact()
    {
        return $this->belongsTo(Person::class, 'contact_id');
    }
    public function address()
    {
        return $this->belongsToMany(Address::class, 'order_address');
    }
    public function addressType()
    {
        return $this->belongsToMany(AddressType::class, 'order_address');
    }
    public function deliverSchedule()
    {
        return $this->belongsTo(DeliverSchedule::class);
    }
}
