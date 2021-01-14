<?php

namespace App\Api\Auth\Repositories;

use App\Models\User;
use Illuminate\Support\Facades\DB;

class UserRepository
{
    /**
     * Find user by given email
     *
     * @param string $email
     * @return mixed
     */
    public function findByEmail(string $email)
    {
        $user = collect(DB::select('SELECT 
            id, name, email, password 
        FROM ' . User::TABLE . ' WHERE email = ?', [
            $email
        ]))->first();

        return $user;
    }
}
