<?php

namespace App\Providers;

use App\Extensions\Auth\UserTokenGuard;
use App\Extensions\Auth\UserTokenProvider;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Auth;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        Auth::extend('access_token', function ($app, $name, array $config) {
            $userProvider = app(UserTokenProvider::class);
            $request = app('request');

            return new UserTokenGuard($userProvider, $request, $config);
        });
    }
}
