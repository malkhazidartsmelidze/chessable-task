<?php

namespace App\Providers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        if ($this->app->runningInConsole()) {
            Schema::defaultStringLength(191);
        }

        Request::macro('getPaginationData', function () {
            $perPage = is_numeric($this->perPage) ? (int) $this->perPage : 10;
            $page = is_numeric($this->page) ? (int) $this->page : 0;

            $offset = $perPage * $page;
            $limit = $perPage;

            return [$offset, $limit, $page];
        });
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
