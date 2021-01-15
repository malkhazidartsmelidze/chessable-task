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
}
