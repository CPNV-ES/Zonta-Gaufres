<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Enums\PersonTypesEnum;

class BaseModel extends Model
{
    public static function findOrCreate(array $data)
    {
        $model = self::where($data)->first();

        if (!$model) {
            $model = self::create($data);
            if (get_called_class() == 'App\Models\Person') {
                $personTypeId = PersonTypesEnum::CLIENT->value;
                $model->personType()->attach(PersonType::where('name', PersonTypesEnum::from($personTypeId)->name)->first());
            }
        }


        return $model;
    }
}
