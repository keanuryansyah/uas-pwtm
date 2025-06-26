<?php

namespace App\Http\Controllers;

use App\Models\MenuItem;
use App\Models\Category;
use Illuminate\Http\Request;

class GetMenuController extends Controller
{
    function index()
    {
        $post = MenuItem::with('category')->latest()->get();
        $categories = Category::all();
        return view('home', ['menus' => $post, 'categories' => $categories]);
    }
}
