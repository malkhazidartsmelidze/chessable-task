<?php

use Illuminate\Support\Facades\Route;

require_once app_path('Api/Auth/Routes.php');

Route::middleware('auth:token')->group(function () {
    require_once app_path('Api/Company/Routes.php');
});
