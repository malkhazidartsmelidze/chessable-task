<?php

namespace App\Api\Department\Repositories;

use App\Helpers\Repository;
use App\Models\Company;
use App\Models\Department;
use App\Models\Employee;
use App\Traits\HasSimpleCrudActions;
use Illuminate\Support\Facades\DB;

class DepartmentRepository extends Repository
{
    use HasSimpleCrudActions;

    private $table = Department::TABLE;
    private $companies_table = Company::TABLE;
    private $employees_table = Employee::TABLE;

    /**
     * List All User Departments and including meta information (With Pagination)
     *
     * @param App\Models\User|object $user
     * @return array[object]
     */
    public function listUserDepartments($user)
    {
        list($offset, $limit) = request()->getPaginationData();

        return DB::select("SELECT 
                dep.id,
                dep.name,
                comp.name as company_name,
                IFNULL(emp.salary_sum, 0) AS total_salary,
                IFNULL(emp.count, 0) AS total_employee
            FROM $this->table dep
            JOIN $this->companies_table comp ON comp.id = dep.company_id

            LEFT JOIN (
                SELECT 
                    count(*) as count,
                    sum(salary) as salary_sum,
                    department_id
                FROM $this->employees_table
                GROUP BY department_id
            ) emp ON emp.department_id = dep.id
            
            WHERE comp.user_id = ? " .
            (request('company_id', null) ? ' AND comp.id = ' . (int) request('company_id') :  '')
            . "
            LIMIT $limit
            OFFSET $offset
        ", [$user->id]);
    }

    /**
     * Get how much companines user has 
     *
     * @param App\Models\User|object $user
     * @return int
     */
    public function getUserDepartmentsCount($user): int
    {
        return DB::selectOne(
            "SELECT 
            count(*) as count 
        FROM $this->table dep
        JOIN $this->companies_table comp ON comp.id = dep.company_id
        WHERE comp.user_id = ? " . (request('company_id', null) ? ' AND comp.id = ' . (int) request('company_id') :  ''),
            [$user->id]
        )->count ?? 0;
    }
}
