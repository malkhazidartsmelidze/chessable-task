<?php

namespace App\Api\Company\Requests;

class DeleteCompanyRequest extends CompanyRequest
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
