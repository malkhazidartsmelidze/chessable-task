<?php

use Illuminate\Support\Facades\Route;
use App\Api\Company\Controllers\CompanyResourceController;

Route::middleware('auth:token')->prefix('/company')->group(function () {
    Route::post('/save', [CompanyResourceController::class, 'save']);
    Route::put('/update', [CompanyResourceController::class, 'udpate']);
    Route::delete('/delete', [CompanyResourceController::class, 'delete']);
    Route::get('/list', [CompanyResourceController::class, 'list']);
});
