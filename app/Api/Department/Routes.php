<?php

use Illuminate\Support\Facades\Route;
use App\Api\Department\Controllers\DepartmentResourceController;

Route::middleware('auth:token')->prefix('/department')->group(function () {
    Route::post('/save', [DepartmentResourceController::class, 'save']);
    Route::post('/update', [DepartmentResourceController::class, 'udpate']);
    Route::delete('/delete/{id}', [DepartmentResourceController::class, 'delete']);
    Route::post('/list', [DepartmentResourceController::class, 'list']);
    Route::get('/{id}', [DepartmentResourceController::class, 'getSingle']);
});
