<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserToken extends Model
{
    public const TABLE = 'user_tokens';
    public $table = 'user_tokens';
    public $guarded = [];
}
