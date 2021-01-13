<?php

namespace App\Api\Auth\Controllers;

use App\Models\UserToken;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class LogoutAction
{
    /**
     * Logout logged in user by token
     *
     * @return JsonResponse
     */
    public function __invoke()
    {
        DB::delete('DELETE FROM ' . UserToken::TABLE . ' WHERE access_token = ?', [auth()->getTokenFromRequest()]);

        return response()->json([
            'success' => true
        ]);
    }
}
