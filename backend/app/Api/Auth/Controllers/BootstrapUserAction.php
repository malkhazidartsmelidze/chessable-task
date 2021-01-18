<?php

namespace App\Api\Auth\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class BootstrapUserAction
{
    /**
     * Bootstrap user with data
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function __invoke(Request $request)
    {
        $user = $request->user();

        return response()->json([
            'user' => $user
        ]);
    }
}
