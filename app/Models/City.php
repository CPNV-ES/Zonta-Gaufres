<?php

namespace App\Models;

use Faker\Provider\Base;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class City extends BaseModel
{
    use HasFactory;

    protected $fillable = [
        'name',
        'zip_code',
    ];

    public function address()
    {
        return $this->hasMany(Address::class);
    }
}
