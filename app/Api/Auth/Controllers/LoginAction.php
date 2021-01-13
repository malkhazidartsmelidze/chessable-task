<?php

namespace App\Api\Auth\Controllers;

use App\Models\UserToken;
use Illuminate\Support\Str;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use App\Exceptions\FieldException;
use App\Api\Auth\Requests\LoginRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;

class LoginAction
{
    /**
     * Login user with credentials
     *
     * @param LoginRequest $loginRequest
     * @return JsonResponse
     */
    public function __invoke(LoginRequest $loginRequest)
    {
        /* Find User By Email */
        $user = collect(DB::select('SELECT 
            id, name, email, password 
        FROM ' . User::TABLE . ' WHERE email = ?', [
            $loginRequest->getEmail()
        ]))->first();

        if (!$user) {
            throw new FieldException('email', __('Incorrec Email'));
        }

        if (!app('hash')->check($loginRequest->getPassword(), $user->password)) {
            throw new FieldException('password', __('Incorrect Password'));
        }

        DB::insert('INSERT 
            INTO ' . UserToken::TABLE . ' (user_id, access_token, created_at, updated_at) 
            VALUES (?,?,?,?)', [
            $user->id, Str::random(100), now()->format('Y-m-d H:i:s'), now()->format('Y-m-d H:i:s')
        ]);

        $token = collect(DB::select('SELECT 
                id, access_token, user_id
            FROM ' . UserToken::TABLE . ' WHERE id = ?', [
            DB::getPdo()->lastInsertId()
        ]))->first();

        return response()->json([
            'token' => $token->access_token
        ]);
    }
}
