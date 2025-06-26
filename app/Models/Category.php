<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\MenuItem;

class Category extends Model
{
    protected $guarded = ['id'];

    public function menu_item()
    {
        return $this->hasMany(MenuItem::class, 'category_id');
    }
}
