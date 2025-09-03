<?php

declare(strict_types=1);

use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\FavoriteController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\ProductTypeController;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Api\UserCartProductController;
use Illuminate\Support\Facades\Route;

// Contact form
Route::post('/contact', [ContactController::class, 'store']);

Route::prefix('products')->group(function () {
    Route::get('/', [ProductController::class, 'index']);
    Route::get('/{product}', [ProductController::class, 'show']);
    Route::post('/', [ProductController::class, 'store']);
    Route::put('/{product}', [ProductController::class, 'update']);
    Route::delete('/{product}', [ProductController::class, 'destroy']);
});

Route::prefix('product-types')->group(function () {
    Route::get('/', [ProductTypeController::class, 'index']);
    Route::get('/{productType}', [ProductTypeController::class, 'show']);
    Route::post('/', [ProductTypeController::class, 'store']);
    Route::put('/{productType}', [ProductTypeController::class, 'update']);
    Route::delete('/{productType}', [ProductTypeController::class, 'destroy']);
});

Route::middleware(['auth:sanctum'])->prefix('favorites')->group(function () {
    Route::get('/', [FavoriteController::class, 'index']);
    Route::post('/{product}', [FavoriteController::class, 'toggle']);
    Route::get('/{product}/check', [FavoriteController::class, 'check']);
});

Route::middleware(['auth:sanctum'])->prefix('cart')->group(function () {
    Route::get('/', [UserCartProductController::class, 'index']);
    Route::post('/{product}', [UserCartProductController::class, 'addOrUpdate']);
    Route::delete('/{product}', [UserCartProductController::class, 'remove']);
    Route::delete('/', [UserCartProductController::class, 'clear']);
});

Route::middleware(['auth:sanctum'])->prefix('profile')->group(function () {
    Route::get('/', [ProfileController::class, 'show']);
    Route::put('/', [ProfileController::class, 'update']);
});

Route::middleware(['auth:sanctum'])->prefix('orders')->group(function () {
    Route::get('/', [OrderController::class, 'index']);
    Route::post('/', [OrderController::class, 'store']);
    Route::get('/{order}', [OrderController::class, 'show']);
    Route::post('/{order}/cancel', [OrderController::class, 'cancel']);
    Route::put('/{order}/payment-status', [OrderController::class, 'updatePaymentStatus']);
});
