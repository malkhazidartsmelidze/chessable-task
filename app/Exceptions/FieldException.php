<?php

namespace App\Exceptions;

use Exception;

class FieldException extends Exception
{
    private $field;
    private $err;
    private $status;

    public function __construct($field, $err = '', $status = 400)
    {
        $this->field = $field;
        $this->err = $err;
        $this->status = $status;
    }

    public function render()
    {
        return response()->json([
            'error' => true,
            'fields' => [
                $this->field => $this->err,
            ]
        ], $this->status);
    }
}
