<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;


class Article extends Model
{
    public function orders(): BelongsToMany
    {
        return $this->belongsToMany(Order::class, 'order_article')->withPivot('quantity');
    }
}
