<?php

namespace App\Extensions\Auth;

use Illuminate\Http\Request;
use Illuminate\Auth\GuardHelpers;
use Illuminate\Contracts\Auth\Guard as CustomGuard;

class UserTokenGuard implements CustomGuard
{
    use GuardHelpers;

    private $inputKey = '';
    private $storageKey = '';
    private $request;

    /**
     * UserTokenProvider constructor.
     * @param UserTokenProvider $provider
     * @param Request $request
     * @param array $config
     */
    public function __construct(UserTokenProvider $provider, Request $request, $config)
    {
        $this->provider = $provider;
        $this->request = $request;
        // check in request
        $this->inputKey = $config['input_key'] ?? 'access_token';
        // check in database
        $this->storageKey = $config['storage_key'] ?? 'access_token';
    }

    /**
     * @return \Illuminate\Contracts\Auth\Authenticatable|null
     */
    public function user()
    {
        if (!is_null($this->user)) {
            return $this->user;
        }
        $user = null;
        $token = $this->getTokenFromRequest();
        if (!$token) return $user;

        $user = $this->provider->retrieveById($token);

        if (!$user) {
            $user = $this->provider->retrieveByToken($this->storageKey, $token);
        }

        return $this->user = $user;
    }

    /**
     * @param array $credentials
     * @return bool
     */
    public function validate(array $credentials = [])
    {
        if (empty($credentials[$this->inputKey])) {
            return false;
        }

        $credentials = [$this->storageKey => $credentials[$this->inputKey]];

        if ($this->provider->retrieveByCredentials($credentials)) {
            return true;
        }

        return false;
    }

    /**
     * Get the token for the current request.
     * @return string
     */
    public function getTokenFromRequest()
    {
        if ($token = $this->request->bearerToken()) {
            return $token;
        } else if ($token = $this->request->input($this->inputKey)) {
            return $token;
        }

        return null;
    }
}
