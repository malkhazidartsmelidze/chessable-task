<?php

namespace App\Api\Auth\Controllers;

use Illuminate\Http\JsonResponse;
use App\Exceptions\FieldException;
use App\Api\Auth\Requests\LoginRequest;
use App\Api\Auth\Repositories\UserRepository;
use App\Api\Auth\Repositories\UserTokenRepository;

class LoginAction
{
    /**
     * Login user with credentials
     *
     * @param LoginRequest $loginRequest
     * @return JsonResponse
     */
    public function __invoke(LoginRequest $loginRequest, UserRepository $userRepository, UserTokenRepository $userTokenRepository)
    {
        /* Find User By Email */
        if (!$user = $userRepository->findByEmail(
            $loginRequest->getEmail()
        )) {
            throw new FieldException('email', __('Incorrec Email'));
        }

        if (!app('hash')->check($loginRequest->getPassword(), $user->password)) {
            throw new FieldException('password', __('Incorrect Password'));
        }

        $token = $userTokenRepository->createNewTokenForUser($user);

        return response()->json([
            'token' => $token->access_token
        ]);
    }
}
