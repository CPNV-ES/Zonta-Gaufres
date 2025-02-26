<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class City extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'zip_code',
    ];

    public static function findOrCreate(array $data)
    {
        $city = self::where([
            'name' => $data['name'],
            'zip_code' => $data['zip_code']
        ])->first();

        if (!$city) {
            $city = self::create($data);
        }

        return $city;
    }

    public function address()
    {
        return $this->hasMany(Address::class);
    }
    public function deliveryGuySchedule()
    {
        return $this->belongsToMany(DeliveryGuySchedule::class);
    }
}
