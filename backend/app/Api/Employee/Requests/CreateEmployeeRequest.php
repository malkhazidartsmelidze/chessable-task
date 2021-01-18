<?php

namespace App\Api\Employee\Requests;

class CreateEmployeeRequest extends EmployeeRequest
{
    /**
     * Authorize Create Request
     *
     * @return boolean
     */
    public function authorize()
    {
        return true;
    }
}
