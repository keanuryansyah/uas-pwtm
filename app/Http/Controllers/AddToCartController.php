<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;

use Illuminate\Http\Request;
use App\Models\TemporaryOrder;

class AddToCartController extends Controller
{
    public function store(Request $request)
    {
        $userId = Auth::id();
        $productId = $request->idProduct;
        $qty = $request->qtyProduct;
        $price = $request->priceProduct;
        // Cek apakah item sudah ada
        $existing = TemporaryOrder::where('user_id', $userId)
            ->where('product_id', $productId)
            ->first();

        if ($existing) {
            // Jika sudah ada, update qty dan price
            $existing->qty += $qty;
            $existing->price += $price;
            $existing->save();
        } else {
            // Jika belum ada, buat baru
            TemporaryOrder::create([
                'user_id' => $userId,
                'product_id' => $productId,
                'qty' => $qty,
                'price' => $price
            ]);
        }

        return response('success');
    }
}
