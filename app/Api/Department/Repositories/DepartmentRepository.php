<?php

namespace App\Api\Department\Repositories;

use App\Helpers\Repository;
use App\Models\Company;
use App\Models\Department;
use App\Models\Employee;
use App\Traits\RepoHasAutoComplete;
use App\Traits\RepoHasSimpleCrudActions;
use Illuminate\Support\Facades\DB;

class DepartmentRepository extends Repository
{
    use RepoHasSimpleCrudActions, RepoHasAutoComplete;

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
        list($filters, $bindings) = $this->createFilters('dep');

        return DB::select("SELECT 
                dep.id,
                dep.name,
                IFNULL(emp.salary_sum, 0) AS total_salary,
                IFNULL(emp.count, 0) AS total_employee,
                IFNULL(emp.max_salary, 0) AS max_salary
            FROM $this->table dep

            LEFT JOIN (
                SELECT 
                    count(*) as count,
                    max(emp.salary) as max_salary,
                    sum(emp.salary) as salary_sum,
                    emp.department_id
                FROM $this->employees_table emp
                JOIN $this->companies_table comp ON comp.id = emp.company_id
                WHERE user_id = :user_id
                GROUP BY department_id
            ) emp ON emp.department_id = dep.id
            WHERE 1 " . $filters . "
            ORDER BY dep.id
            LIMIT $limit
            OFFSET $offset
        ", ['user_id' => $user->id] + $bindings);
    }

    /**
     * Create Filters
     *
     * @return array
     */
    private function createFilters($table)
    {
        $filters = "";
        $requestedFilters = request()->getSimplifiedRequestFilters();

        if (isset($requestedFilters['name'])) {
            $filters .= "AND $table.name LIKE :name";
            $requestedFilters['name'] = "%$requestedFilters[name]%";
        }

        return [$filters, $requestedFilters];
    }

    /**
     * Get how much Departments Exists
     *
     * @return int
     */
    public function getDepartmentsCount(): int
    {
        list($filters, $bindings) = $this->createFilters('dep');

        return DB::selectOne(
            "SELECT 
                count(*) as count 
            FROM $this->table dep WHERE 1 $filters",
            $bindings
        )->count ?? 0;
    }
}
