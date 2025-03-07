<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id',
        'client_id',
    ];


    public function order()
    {
        return $this->belongsTo(Order::class);
    }
    public function client()
    {
        return $this->belongsTo(Person::class);
    }
    public function invoiceStatus()
    {
        return $this->belongsTo(InvoiceStatus::class, "status_id");
    }
}
