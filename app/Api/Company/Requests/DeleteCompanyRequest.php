<?php

namespace App\Api\Company\Requests;

class DeleteCompanyRequest extends CompanyRequest
{
    public function rules()
    {
        return [
            'id' => ['required', 'numeric'],
        ];
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
