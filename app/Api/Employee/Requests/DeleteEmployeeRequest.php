<?php

namespace App\Api\Employee\Requests;

class DeleteEmployeeRequest extends EmployeeRequest
{
    public function rules()
    {
        return [];
    }

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
