<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\TemporaryOrder;
use App\Models\Order;
use App\Models\User;

class OrderController extends Controller
{
    public function send(Request $request)
    {
        $user = Auth::user();

        if (!$user) {
            return response('unauthorized', 401);
        }

        $items = TemporaryOrder::where('user_id', $user->id)->get();

        if ($items->isEmpty()) {
            return response('empty', 400);
        }

        $totalPrice = $items->sum('price');

        switch ($request->action) {
            case 'send':
                // Cari order dengan status pending
                $existingOrder = \App\Models\Order::where('id_user', $user->id)
                    ->where('status', 'pending')
                    ->first();

                if ($existingOrder) {
                    // Hanya update status jadi paid
                    $existingOrder->status = 'paid';
                    $existingOrder->save();

                    // Hapus keranjang setelah benar-benar dikirim
                    TemporaryOrder::where('user_id', $user->id)->delete();

                    return response('success');
                } else {
                    // Jika tidak ada pending order, buat baru
                    $order = new \App\Models\Order();
                    $order->id_user = $user->id;
                    $order->nama_user = $user->name;
                    $order->total_price = $totalPrice;
                    $order->status = 'paid';
                    $order->save();

                    TemporaryOrder::where('user_id', $user->id)->delete();

                    return response('success');
                }

            case 'cancel':
                // Simpan order status pending
                $existingOrder = \App\Models\Order::where('id_user', $user->id)
                    ->where('status', 'pending')
                    ->first();

                if (!$existingOrder) {
                    $order = new \App\Models\Order();
                    $order->id_user = $user->id;
                    $order->nama_user = $user->name;
                    $order->total_price = $totalPrice;
                    $order->status = 'pending';
                    $order->save();
                }

                return response('success');

            default:
                return response('invalid action', 400);
        }
    }
}
