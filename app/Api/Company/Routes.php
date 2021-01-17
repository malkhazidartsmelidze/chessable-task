<?php

use Illuminate\Support\Facades\Route;
use App\Api\Company\Controllers\CompanyResourceController;

Route::middleware('auth:token')->prefix('/company')->group(function () {
    Route::post('/save', [CompanyResourceController::class, 'save']);
    Route::post('/update', [CompanyResourceController::class, 'udpate']);
    Route::delete('/delete/{id}', [CompanyResourceController::class, 'delete']);
    Route::post('/list', [CompanyResourceController::class, 'list']);
    Route::get('/autocomplete', [CompanyResourceController::class, 'autoComplete']);
    Route::get('/{id}', [CompanyResourceController::class, 'getSingle']);
});
