<?php

namespace App\Api\Employee\Repositories;

use App\Helpers\Repository;
use App\Models\Company;
use App\Models\Employee;
use App\Models\Department;
use App\Traits\RepoHasSimpleCrudActions;
use Illuminate\Support\Facades\DB;

class EmployeeRepository extends Repository
{
    use RepoHasSimpleCrudActions;

    private $table = Employee::TABLE;
    private $companies_table = Company::TABLE;
    private $departments_table = Department::TABLE;

    /**
     * List All User Employees and including meta information (With Pagination)
     *
     * @param App\Models\User|object $user
     * @return array[object]
     */
    public function listUserEmployees($user)
    {
        list($offset, $limit) = request()->getPaginationData();

        return DB::select("SELECT 
                emp.id,
                emp.name,
                emp.lastname,
                emp.address,
                emp.salary,
                emp.bank_account,
                emp.department_id,
                dep.name as department_name,
                comp.name as company_name
            FROM $this->table emp
            JOIN $this->departments_table dep ON dep.id = emp.department_id
            JOIN $this->companies_table comp ON comp.id = dep.company_id
            WHERE 1 AND comp.user_id = ? " . $this->filterEmployees() . "
            ORDER BY dep.id
            LIMIT $limit
            OFFSET $offset
        ", [$user->id]);
    }

    public function filterEmployees()
    {
        $filter = '';
        return $filter;
    }

    /**
     * Return Employee Company
     *
     * @param object $employee
     * @return object|null
     */
    public function getDepartment($employee)
    {
        return DB::selectOne(
            "SELECT 
                dep.id, 
                dep.name
            FROM $this->departments_table dep
            JOIN $this->table emp ON dep.id = emp.department_id
            WHERE dep.id = ?",
            [$employee->id]
        );
    }

    /**
     * Get how much Employees user has 
     *
     * @param App\Models\User|object $user
     * @return int
     */
    public function getUserEmployeesCount($user): int
    {
        return DB::selectOne(
            "SELECT 
            count(*) as count
            FROM $this->table emp
            JOIN $this->departments_table dep ON dep.id = emp.department_id
            JOIN $this->companies_table comp ON comp.id = dep.company_id
            WHERE 1 AND comp.user_id = ?",
            [$user->id]
        )->count ?? 0;
    }
}
