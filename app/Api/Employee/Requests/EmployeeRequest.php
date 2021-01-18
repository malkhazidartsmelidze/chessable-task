<?php

namespace App\Api\Employee\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EmployeeRequest extends FormRequest
{
    protected $validationRules = [
        'name'          => ['required', 'string', 'max:50'],
        'department_id' => ['required', 'numeric'],
        'company_id'    => ['required', 'numeric'],
        'lastname'      => ['required', 'string', 'max:50'],
        'bank_account'  => ['required', 'string', 'max:50'],
        'address'       => ['nullable', 'string', 'max:80'],
        'salary'        => ['required', 'numeric', 'min:0'],
    ];

    /**
     * Get Employee ID
     *
     * @return string|null
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Get Employee Name
     *
     * @return string|null
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Return Employee department_id
     *
     * @return integer
     */
    public function getDepartmentId()
    {
        return (int) $this->department_id;
    }

    /**
     * Return Employee company_id
     *
     * @return integer
     */
    public function getCompanyId()
    {
        return (int) $this->company_id;
    }

    /**
     * Return Employee lastname
     *
     * @return string|null
     */
    public function getLastname()
    {
        return $this->lastname;
    }

    /**
     * Return Employee bank_account
     *
     * @return string|null
     */
    public function getBankAccount()
    {
        return $this->bank_account;
    }

    /**
     * Return Employee address
     *
     * @return string|null
     */
    public function getAddress()
    {
        return $this->address;
    }

    /**
     * Return Employee salary
     *
     * @return double|null
     */
    public function getSalary()
    {
        return (float) $this->salary;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return $this->validationRules;
    }
}
