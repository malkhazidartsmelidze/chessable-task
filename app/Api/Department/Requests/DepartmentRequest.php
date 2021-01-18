<?php

namespace App\Api\Department\Requests;

use Illuminate\Foundation\Http\FormRequest;

class DepartmentRequest extends FormRequest
{
    protected $validationRules = [
        'name'       => ['required', 'max:80', 'string',],
    ];

    /**
     * Get Department ID
     *
     * @return string|null
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Get Department Name
     *
     * @return string|null
     */
    public function getName()
    {
        return $this->name;
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
