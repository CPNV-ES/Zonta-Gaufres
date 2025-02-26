<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    use HasFactory;

    protected $fillable = [
        'street',
        'street_number',
        'country',
        'region',
        'city_id',
    ];

    public static function findOrCreate(array $data)
    {
        $address = self::where([
            'street' => $data['street'],
            'street_number' => $data['street_number'],
            'region' => $data['region'],
            'country' => $data['country'],
            'city_id' => $data['city_id']
        ])->first();

        if (!$address) {
            $address = self::create($data);
        }

        return $address;
    }
    public function orders()
    {
        return $this->hasMany(Order::class);
    }
    public function city()
    {
        return $this->belongsTo(City::class);
    }
}
