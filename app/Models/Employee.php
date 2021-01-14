<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    public const TABLE = 'employees';
    public $table = 'employees';
    public $guarded = [];
}
