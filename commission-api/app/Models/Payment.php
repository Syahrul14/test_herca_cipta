<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;

    protected $fillable = [
        'selling_id',
        'amount',
        'payment_date',
    ];

    public function selling()
    {
        return $this->belongsTo(Selling::class);
    }
}
