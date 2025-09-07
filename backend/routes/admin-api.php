<?php


use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json(['message' => 'Welcome to admin.']);
})->middleware('role:admin');
