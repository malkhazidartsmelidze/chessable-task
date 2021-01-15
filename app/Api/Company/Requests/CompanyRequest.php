<?php

namespace App\Api\Company\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CompanyRequest extends FormRequest
{
    /**
     * Get Company Name
     *
     * @return string|null
     */
    public function getName()
    {
        return $this->name;
    }
    /**
     * Get Company Code
     *
     * @return string|null
     */
    public function getCode()
    {
        return $this->code;
    }
    /**
     * Get Company Address
     *
     * @return string|null
     */
    public function getAddress()
    {
        return $this->address;
    }
    /**
     * Get Company Email
     *
     * @return string|null
     */
    public function getEmail()
    {
        return $this->email;
    }
    /**
     * Get Company Phone_number
     *
     * @return string|null
     */
    public function getPhoneNumber()
    {
        return $this->phone_number;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name'         => ['required', 'max:80', 'string',],
            'code'         => ['required', 'max:20', 'string'],
            'address'      => ['required', 'max:80', 'string',],
            'email'        => ['nullable', 'email', 'max:70'],
            'phone_number' => ['required', 'string', 'max:20'],
        ];
    }
}
