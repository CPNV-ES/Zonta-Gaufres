<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use App\Enums\PersonTypesEnum;

class Person extends BaseModel
{
    use HasFactory;

    protected $fillable = [
        'firstname',
        'lastname',
        'email',
        'company',
        'phone_number',
        'remark',
    ];

    public function getFullnameAttribute()
    {
        return $this->firstname . ' ' . $this->lastname;
    }

    public function personType(): BelongsToMany
    {
        return $this->belongsToMany(PersonType::class);
    }
    public function ordersToDeliver()
    {
        return $this->hasMany(Order::class, 'delivery_guy_id');
    }
    public function orders()
    {
        return $this->hasMany(Order::class, 'buyer_id');
    }
    public function contacts()
    {
        return $this->hasMany(Order::class, 'contact_id');
    }

    // public function delete()
    // {
    //     # Fucking cascade delete
    //     foreach ($this->orders as $order) {
    //         $order->delete();
    //     }
    //     foreach ($this->contacts as $contact) {
    //         $contact->contact_id = null;
    //         $contact->save();
    //     }
    //     foreach ($this->ordersToDeliver as $order) {
    //         $order->delivery_guy_id = null;
    //         $order->save();
    //     }
    //     foreach ($this->personType as $type) {
    //         $this->personType()->detach($type);
    //     }

    //     return parent::delete();
    // }
}
