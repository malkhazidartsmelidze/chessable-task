<?php

use Illuminate\Support\Facades\Route;
use App\Api\Employee\Controllers\EmployeeResourceController;

Route::middleware('auth:token')->prefix('/employee')->group(function () {
    Route::post('/save', [EmployeeResourceController::class, 'save']);
    Route::post('/update', [EmployeeResourceController::class, 'udpate']);
    Route::delete('/delete/{id}', [EmployeeResourceController::class, 'delete']);
    Route::post('/list', [EmployeeResourceController::class, 'list']);
    Route::get('/{id}', [EmployeeResourceController::class, 'getSingle']);
});
