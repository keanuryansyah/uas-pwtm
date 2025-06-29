<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\MenuItem;

class TemporaryOrder extends Model
{
    protected $fillable = ['user_id', 'product_id', 'qty', 'price'];

    public function product()
    {
        return $this->belongsTo(MenuItem::class, 'product_id');
    }
}
