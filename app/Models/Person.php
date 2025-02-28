<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use App\Enums\PersonTypesEnum;

class Person extends Model
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
    public static function findOrCreate(array $data)
    {
        $person = self::where([
            'firstname' => $data['firstname'],
            'lastname' => $data['lastname'],
            'phone_number' => $data['phone_number']
        ])->first();

        if (!$person) {
            $person = self::create($data);
            $personTypeId = PersonTypesEnum::CLIENT->value;
            $person->personType()->attach(PersonType::where('name', PersonTypesEnum::from($personTypeId)->name)->first());
        }

        return $person;
    }

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
    public function deliveryGuySchedule()
    {
        return $this->hasMany(DeliveryGuySchedule::class, 'person_id');
    }
}
