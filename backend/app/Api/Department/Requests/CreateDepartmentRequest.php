<?php

namespace App\Api\Department\Requests;

class CreateDepartmentRequest extends DepartmentRequest
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
