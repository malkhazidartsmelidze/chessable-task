<?php

use Illuminate\Support\Facades\Route;
use App\Api\Auth\Controllers\LoginAction;
use App\Api\Auth\Controllers\LogoutAction;
use App\Api\Auth\Controllers\BootstrapUserAction;

Route::post('/login', LoginAction::class);

Route::middleware('auth:token')->group(function () {
    Route::get('/bootstrap', BootstrapUserAction::class);
    Route::get('/logout', LogoutAction::class);
});
