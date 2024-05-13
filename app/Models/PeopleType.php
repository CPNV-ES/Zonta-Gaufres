<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class PeopleType extends Model
{
    public function people(): BelongsToMany
    {
        return $this->belongsToMany(People::class);
    }
}
