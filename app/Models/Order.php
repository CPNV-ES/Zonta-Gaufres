<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Order extends Model
{
    public function articles(): BelongsToMany
    {
        return $this->belongsToMany(Article::class, 'order_article')->withPivot('quantity');
    }

    public function buyer()
    {
        return $this->belongsTo(People::class, 'buyer_id');
    }
    public function contact()
    {
        return $this->belongsTo(People::class, 'contact_id');
    }
}
