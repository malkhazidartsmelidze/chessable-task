<?php

namespace App\Api\Auth\Repositories;

use App\Models\UserToken;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class UserTokenRepository
{
    /**
     * Delete given token from db
     *
     * @param string $token
     * @return void
     */
    public function deleteByAccessToken(string $token): void
    {
        DB::delete('DELETE 
            FROM ' . UserToken::TABLE . ' 
            WHERE access_token = ?
        ', [$token]);
    }

    /**
     * Create new token for given user and return it as
     *
     * @param mixed $user
     * @return mixed
     */
    public function createNewTokenForUser($user)
    {
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

        return $token;
    }
}
