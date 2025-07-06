<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TemporaryOrder;
use App\Models\Order;
use Illuminate\Support\Facades\Auth;

class UpdatePriceController extends Controller
{
    public function index(Request $request)
    {
        $action = $request->action;
        $oriPrice = $request->oriPrice;
        $idProduct = $request->idProduct;
        $userId = Auth::id();

        switch ($action) {
            case 'plus':
                $temporaryOrderItem = TemporaryOrder::where('product_id', $idProduct)
                    ->where('user_id', $userId)
                    ->first();

                if ($temporaryOrderItem) {
                    $temporaryOrderItem->update([
                        'price' => $temporaryOrderItem->price + $oriPrice,
                        'qty' => $temporaryOrderItem->qty + 1
                    ]);

                    $this->updatePendingOrderTotal($userId);
                    return response('success');
                } else {
                    return response('failed');
                }

            case 'min':
                $temporaryOrderItem = TemporaryOrder::where('product_id', $idProduct)
                    ->where('user_id', $userId)
                    ->first();

                if ($temporaryOrderItem) {
                    $temporaryOrderItem->update([
                        'price' => $temporaryOrderItem->price - $oriPrice,
                        'qty' => $temporaryOrderItem->qty - 1
                    ]);

                    $this->updatePendingOrderTotal($userId);
                    return response('success');
                } else {
                    return response('failed');
                }

            case 'delete':
                $temporaryOrderItem = TemporaryOrder::where('product_id', $idProduct)
                    ->where('user_id', $userId)
                    ->first();

                if ($temporaryOrderItem) {
                    $temporaryOrderItem->delete();
                    $this->updatePendingOrderTotal($userId);
                    return response('success');
                } else {
                    return response('failed');
                }

            default:
                return response('invalid action', 400);
        }
    }

    private function updatePendingOrderTotal($userId)
    {
        $total = TemporaryOrder::where('user_id', $userId)->sum('price');

        $order = Order::where('id_user', $userId)
            ->where('status', 'pending')
            ->first();

        if ($order) {
            if ($total == 0) {
                $order->delete();
            } else {
                $order->total_price = $total;
                $order->save();
            }
        }
    }
}
