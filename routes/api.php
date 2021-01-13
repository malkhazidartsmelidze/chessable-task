<?php

use Illuminate\Support\Facades\Route;

Route::prefix('auth')->group(function () {
    require_once app_path('Api/Auth/Routes.php');
});

// Route::middleware('auth:api')->get('/user');
