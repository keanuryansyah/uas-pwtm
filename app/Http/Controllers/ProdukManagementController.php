<?php

namespace App\Http\Controllers;

use App\Models\MenuItem;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;


class ProdukManagementController extends Controller
{
    public function index()
    {
        if (!Auth::check() || Auth::user()->role !== 'admin') {
            return redirect('/');
        }
        $post = MenuItem::with('category')->latest()->get();
        $categories = Category::all();
        return view('menu-management', ['posts' => $post, 'categories' => $categories]);
    }

    public function menu_mene(Request $request)
    {
        // Menangani data request
        $data = $request->all();

        if (isset($data['actionButton'])) {

            switch ($data['actionButton']) {
                case 'save-changes':

                    // Ambil Data Parsingan Dari Client
                    $newImageProd = e($data['imageProduk']);
                    $newNameProd = e($data['namaProduk']);
                    $newDeskProd = e($data['deskProduk']);
                    $newPriceProd = e($data['hargaProduk']);
                    $idProd = e($data['idProduk']);
                    $catProd = e($data['catProduk']);

                    // Validasi Data Parsingan Dari Client
                    if (strlen($newNameProd) < 3) {
                        return 'name-failed';
                    } else if (strlen($newDeskProd) < 5) {
                        return 'desk-failed';
                    } else if (strlen($newPriceProd) < 3) {
                        return 'price-failed';
                    }

                    // Update Data
                    $menuItem = MenuItem::find($idProd);

                    if ($menuItem) {
                        $menuItem->update([
                            'image_prod' => $newImageProd,
                            'name_prod' => $newNameProd,
                            'desk_prod' => $newDeskProd,
                            'harga_prod' => $newPriceProd,
                            'category_id' => $catProd
                        ]);

                        return 'item-updated';
                    } else {
                        return 'failed';
                    }

                    break;

                case 'delete-button':

                    $menuItem = MenuItem::find($data['dataProduk']);
                    $menuItem->delete();

                    return 'item-deleted';

                    break;

                case 'save-new-product':

                    // VALIDASI
                    if (
                        empty($data['imageProduct']) ||
                        empty($data['nameProduk']) ||
                        empty($data['deskProduk']) ||
                        empty($data['priceProduk']) ||
                        empty($data['catProduk'])
                    ) {
                        return response('error');
                    }

                    // SIMPAN DATA
                    $menuItem = new MenuItem();
                    $menuItem->image_prod = e($data['imageProduct']);
                    $menuItem->name_prod = e($data['nameProduk']);
                    $menuItem->desk_prod = e($data['deskProduk']);
                    $menuItem->harga_prod = (int) $data['priceProduk'];
                    $menuItem->category_id = (int) $data['catProduk'];
                    $menuItem->save();

                    return response('success');

                    break;
            }
        }
    }
}
