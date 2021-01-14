<?php

namespace App\Api\Auth\Controllers;

use App\Api\Auth\Repositories\UserTokenRepository;
use Illuminate\Http\JsonResponse;

class LogoutAction
{
    /**
     * Logout logged in user by token
     * 
     * @param UserTokenRepository $userTokenRepository
     * @return JsonResponse
     */
    public function __invoke(UserTokenRepository $userTokenRepository)
    {
        $userTokenRepository->deleteByAccessToken(
            auth()->getTokenFromRequest()
        );

        return response()->json([
            'success' => true
        ]);
    }
}
