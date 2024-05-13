<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class PersonType extends Model
{
    public function person(): BelongsToMany
    {
        return $this->belongsToMany(Person::class);
    }
}
