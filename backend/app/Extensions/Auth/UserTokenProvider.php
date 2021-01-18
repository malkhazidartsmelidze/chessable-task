<?php

namespace App\Extensions\Auth;

use App\Models\User;
use App\Models\UserToken;
use Illuminate\Support\Str;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Contracts\Auth\UserProvider as CustomProvider;

class UserTokenProvider implements CustomProvider
{
    private $token;
    private $user;

    /**
     * UserProvider constructor.
     * @param User $user
     * @param UserToken $token
     */
    public function __construct(User $user, UserToken $token)
    {
        $this->user = $user;
        $this->token = $token;
    }

    /**
     * @param mixed $identifier
     * @return Authenticatable|null
     */
    public function retrieveById($identifier)
    {
        $token = $this->token->where('access_token', $identifier)->first();
        $user = User::find($token->user_id);

        return $user;
    }

    /**
     * @param mixed $identifier
     * @param string $token
     * @return Authenticatable|null
     */
    public function retrieveByToken($identifier, $token)
    {
        $token = $this->token->where($identifier, $token)->first();
        $user = User::find($token->user_id);

        return $user;
    }

    /**
     * @param array $credentials
     * @return Authenticatable|null
     */
    public function retrieveByCredentials(array $credentials)
    {
        $user = $this->user;
        foreach ($credentials as $key => $value) {
            if (!Str::contains($key, 'password')) continue;

            $user->where($key, $value);
        }

        return $user->first();
    }

    /**
     * @param Authenticatable $user
     * @param array $credentials
     * @return bool
     */
    public function validateCredentials(Authenticatable $user, array $credentials)
    {
        $cred = $credentials['password'];

        return app('hash')->check($cred, $user->getAuthPassword());
    }

    public function updateRememberToken(Authenticatable $user, $token)
    {
        // TODO: Implement updateRememberToken() method.
    }
}
