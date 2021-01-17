<?php

namespace App\Api\Department\Requests;

class DeleteDepartmentRequest extends DepartmentRequest
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
