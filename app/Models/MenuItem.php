<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
// use App\Models\Category;

class MenuItem extends Model
{
    protected $guarded = ['id'];

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }
}
