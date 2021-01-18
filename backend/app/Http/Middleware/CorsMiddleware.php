<?php

namespace App\Http\Middleware;

use Closure;

class CorsMiddleware
{
    /**
     * @param $request
     * @param Closure $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        header("Access-Control-Allow-Origin: {$request->header('origin')}", true);
        header('Access-Control-Allow-Headers: Authorization, Content-Type, CartSignature', true);
        header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS', true);

        if ($request->getMethod() === 'OPTIONS') {
            return response('');
        }

        return $next($request);
    }
}
