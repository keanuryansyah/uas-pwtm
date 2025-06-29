<?php

namespace App\Http\Controllers;

use App\Models\MenuItem;
use App\Models\Category;
use App\Models\TemporaryOrder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class GetMenuController extends Controller
{
    function index()
    {
        $post = MenuItem::with('category')->latest()->get();
        $categories = Category::all();

        $carts = TemporaryOrder::with('product')->where('user_id', Auth::id())->get();

        return view('home', ['menus' => $post, 'categories' => $categories, 'carts' => $carts]);
    }
}
