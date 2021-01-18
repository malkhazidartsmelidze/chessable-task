<?php

namespace App\Api\Company\Requests;

class CreateCompanyRequest extends CompanyRequest
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
