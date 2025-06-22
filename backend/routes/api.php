<?php

declare(strict_types=1);

use App\Http\Controllers\Api\FavoriteController;
use App\Http\Controllers\Api\CartController;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductTypeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('products')->group(function () {
    Route::get('/', [ProductController::class, 'index']);
    Route::get('/{id}', [ProductController::class, 'show']);
    Route::post('/', [ProductController::class, 'store']);
    Route::put('/{id}', [ProductController::class, 'update']);
    Route::delete('/{id}', [ProductController::class, 'destroy']);
});

Route::prefix('product-types')->group(function () {
    Route::get('/', [ProductTypeController::class, 'index']);
    Route::get('/{id}', [ProductTypeController::class, 'show']);
    Route::post('/', [ProductTypeController::class, 'store']);
    Route::put('/{id}', [ProductTypeController::class, 'update']);
    Route::delete('/{id}', [ProductTypeController::class, 'destroy']);
});

Route::middleware(['auth:sanctum'])->prefix('favorites')->group(function () {
    Route::get('/', [FavoriteController::class, 'index']);
    Route::post('/{productId}', [FavoriteController::class, 'toggle']);
    Route::get('/{productId}/check', [FavoriteController::class, 'check']);
});

Route::middleware(['auth:sanctum'])->prefix('cart')->group(function () {
    Route::get('/', [CartController::class, 'index']);
    Route::post('/{productId}', [CartController::class, 'addOrUpdate']);
    Route::delete('/{productId}', [CartController::class, 'remove']);
    Route::delete('/', [CartController::class, 'clear']);
});

Route::middleware(['auth:sanctum'])->prefix('profile')->group(function () {
    Route::get('/', [ProfileController::class, 'show']);
    Route::put('/', [ProfileController::class, 'update']);
});
