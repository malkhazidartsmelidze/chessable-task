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
            $perPage = is_numeric($this->pageSize) ? (int) $this->pageSize : 10;
            $page = is_numeric($this->page) ? (int) $this->page : 0;

            $offset = $perPage * $page;
            $limit = $perPage;

            return [$offset, $limit, $page];
        });

        Request::macro('getSimplifiedRequestFilters', function ($aviableFields = null) {
            if (!is_array($this->filters)) return [];
            $filters = [];

            foreach ($this->filters as $filter) {
                if (isset($filter['column']) && isset($filter['value']) && isset($filter['column']['field'])) {
                    if ($aviableFields && !in_array($filter['column']['field'], $aviableFields)) continue;
                    $filters[$filter['column']['field']] = $filter['value'];
                }
            }

            return $filters;
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
