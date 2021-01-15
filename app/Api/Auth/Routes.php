<?php

use Illuminate\Support\Facades\Route;
use App\Api\Auth\Controllers\LoginAction;
use App\Api\Auth\Controllers\LogoutAction;
use App\Api\Auth\Controllers\BootstrapUserAction;

Route::prefix('auth')->group(function () {
    Route::post('/login', LoginAction::class);

    Route::middleware('auth:token')->group(function () {
        Route::post('/bootstrap', BootstrapUserAction::class);
        Route::post('/logout', LogoutAction::class);
    });
});
