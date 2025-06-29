<?php

use App\Http\Controllers\AddToCartController;
use App\Http\Controllers\LoginController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminDashboardController;
use App\Http\Controllers\GetMenuController;
use App\Http\Controllers\GetSubtotalController;
use App\Http\Controllers\MediaFilesController;
use App\Http\Controllers\ProdukManagementController;
use App\Http\Controllers\LoginUserController;
use App\Http\Controllers\UpdatePriceController;

Route::get('/', [
    GetMenuController::class,
    'index'
]);

// Route::get('/dominic', [
//     LoginController::class,
//     'index'
// ]);

Route::post('/dominic', [
    LoginController::class,
    'authenticate'
]);

Route::get('/dashboard', [
    LoginController::class,
    'checking'
]);

Route::post('/logout', [
    LoginController::class,
    'logout'
]);

// Route::middleware(['auth', 'isAdmin'])->group(function () {
//     Route::get('/admin', [AdminDashboardController::class, 'index'])->name('admin.dashboard');
// });

Route::get('/menu-management', [
    ProdukManagementController::class,
    'index'
]);

Route::post('/menu-management', [
    ProdukManagementController::class,
    'menu_mene'
]);

Route::get('/media-files', [
    MediaFilesController::class,
    'index'
]);

Route::post('/upload', [
    MediaFilesController::class,
    'upload_file'
]);

Route::get('/login', [
    LoginUserController::class,
    'index'
]);

Route::post('/add-to-cart', [
    AddToCartController::class,
    'store'
]);

Route::post('/update-price-on-cart', [
    UpdatePriceController::class,
    'index'
]);

Route::post('/get-subtotal', [
    GetSubtotalController::class,
    'index'
]);

Route::post('/send-order', [\App\Http\Controllers\OrderController::class, 'send']);
