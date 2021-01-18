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
        list($filters, $bindings) = $this->createFilters('emp');

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
            JOIN $this->companies_table comp ON comp.id = emp.company_id
            WHERE 1 AND comp.user_id = :user_id $filters
            ORDER BY emp.id
            LIMIT $limit
            OFFSET $offset
        ", ['user_id' => $user->id] + $bindings);
    }

    /**
     * Create Filters
     *
     * @return array
     */
    private function createFilters()
    {
        $filters = "";
        $requestedFilters = request()->getSimplifiedRequestFilters();

        if (isset($requestedFilters['name'])) {
            $filters .= " AND emp.name LIKE :name";
            $requestedFilters['name'] = "%$requestedFilters[name]%";
        }

        if (isset($requestedFilters['lastname'])) {
            $filters .= " AND emp.lastname LIKE :lastname";
            $requestedFilters['lastname'] = "%$requestedFilters[lastname]%";
        }

        if (isset($requestedFilters['address'])) {
            $filters .= " AND emp.address LIKE :address";
            $requestedFilters['address'] = "%$requestedFilters[address]%";
        }

        if (isset($requestedFilters['department_name'])) {
            $filters .= " AND dep.name LIKE :department_name";
            $requestedFilters['department_name'] = "%$requestedFilters[department_name]%";
        }

        if (isset($requestedFilters['company_name'])) {
            $filters .= " AND comp.name LIKE :company_name";
            $requestedFilters['company_name'] = "%$requestedFilters[company_name]%";
        }

        return [$filters, $requestedFilters];
    }


    /**
     * Return Employee Department
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
            WHERE emp.id = ?",
            [$employee->id]
        );
    }

    /**
     * Return Employee Company
     *
     * @param object $employee
     * @return object|null
     */
    public function getCompany($employee)
    {
        return DB::selectOne(
            "SELECT 
                comp.id, 
                comp.name
            FROM $this->companies_table comp
            JOIN $this->table emp ON comp.id = emp.company_id
            WHERE emp.id = ?",
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
        list($filters, $bindings) = $this->createFilters('emp');

        return DB::selectOne(
            "SELECT 
            count(*) as count
            FROM $this->table emp
            JOIN $this->departments_table dep ON dep.id = emp.department_id
            JOIN $this->companies_table comp ON comp.id = emp.company_id
            WHERE 1 AND comp.user_id = :user_id $filters",
            ['user_id' => $user->id] + $bindings
        )->count ?? 0;
    }
}
