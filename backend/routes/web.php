<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return "PetalPost - API";
});

require __DIR__.'/auth.php';
