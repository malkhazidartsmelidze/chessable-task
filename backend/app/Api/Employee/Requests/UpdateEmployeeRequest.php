<?php

namespace App\Api\Employee\Requests;

class UpdateEmployeeRequest extends EmployeeRequest
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

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'id' => ['required', 'numeric'],
        ] + $this->validationRules;
    }
}
