<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use App\Enums\PersonTypesEnum;

class PersonType extends Model
{
    use HasFactory;
    public function person(): BelongsToMany
    {
        return $this->belongsToMany(Person::class);
    }
    public function enum(): PersonTypesEnum
    {
        return PersonTypesEnum::fromCase($this->name);
    }
    public function scopeFromEnum($query, PersonTypesEnum $type)
    {
        return $query->where('name', $type->name);
    }
}
