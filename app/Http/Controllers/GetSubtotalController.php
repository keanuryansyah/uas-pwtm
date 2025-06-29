<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\TemporaryOrder;

class GetSubtotalController extends Controller
{
    public function index(Request $request)
    {

        if ($request->action == 'get-subtotal') {

            $userId = Auth::id();

            // Hitung total subtotal dari seluruh item
            $subtotal = TemporaryOrder::where('user_id', $userId)->sum('price');

            // Kalau mau kembalikan JSON:
            return response($subtotal);
        }
    }
}
