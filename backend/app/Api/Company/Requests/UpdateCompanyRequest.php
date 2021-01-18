<?php

namespace App\Api\Company\Requests;

class UpdateCompanyRequest extends CompanyRequest
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
