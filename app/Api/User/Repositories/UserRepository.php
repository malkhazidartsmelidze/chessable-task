<?php

namespace App\Api\User\Repositories;

use App\Models\Company;
use App\Models\Department;
use App\Models\Employee;
use Illuminate\Support\Facades\DB;

class UserRepository
{
    private $companies_table = Company::TABLE;
    private $employees_table = Employee::TABLE;
    private $departments_table = Department::TABLE;

    /**
     * Determines if user has Access to given company
     *
     * @param App\Models\User $user
     * @param int $company_id
     * @return boolean
     */
    public function hasAccessToCompany($user, $company_id): bool
    {
        return DB::selectOne("SELECT 
                count(*) 
            FROM $this->companies_table 
            WHERE company_id = :company_id 
                AND user_id = :user_id
        ", ['company_id' => $company_id, 'user_id' => $user->id])->count > 0;
    }
}
