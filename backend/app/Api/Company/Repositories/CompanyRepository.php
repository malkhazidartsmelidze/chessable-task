<?php

namespace App\Api\Company\Repositories;

use App\Helpers\Repository;
use App\Models\Company;
use App\Models\Department;
use App\Models\Employee;
use App\Traits\RepoHasAutoComplete;
use App\Traits\RepoHasSimpleCrudActions;
use Illuminate\Support\Facades\DB;

class CompanyRepository extends Repository
{
    use RepoHasSimpleCrudActions, RepoHasAutoComplete;

    private $autoCompleteColumn = 'name';

    private $table = Company::TABLE;
    private $employees_table = Employee::TABLE;
    private $departments_table = Department::TABLE;

    /**
     * List All User Companies and including meta information (With Pagination)
     *
     * @param App\Models\User|object $user
     * @return array[object]
     */
    public function listUserCompaies($user)
    {
        list($offset, $limit) = request()->getPaginationData();
        list($filters, $bindings) = $this->createFilters();

        return DB::select("SELECT 
                id,
                name,
                code,
                address,
                IFNULL(emp.dep_count,0) AS dep_count,
                IFNULL(emp.total_salary, 0) AS total_salary,
                IFNULL(emp.total_employee, 0) AS total_employee
            FROM $this->table comp
            
            # Get Employees metadata
            LEFT JOIN (
                SELECT 
                    count(*) as total_employee,
                    count(DISTINCT department_id) as dep_count,
                    sum(salary) as total_salary,
                    company_id
                FROM $this->employees_table
                GROUP BY company_id
            ) emp ON emp.company_id = comp.id
            
            WHERE user_id = :user_id $filters
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
            $filters .= " AND comp.name LIKE :name";
            $requestedFilters['name'] = "%$requestedFilters[name]%";
        }

        if (isset($requestedFilters['code'])) {
            $filters .= " AND comp.code LIKE :code";
            $requestedFilters['code'] = "%$requestedFilters[code]%";
        }

        if (isset($requestedFilters['address'])) {
            $filters .= " AND comp.address LIKE :address";
            $requestedFilters['address'] = "%$requestedFilters[address]%";
        }

        return [$filters, $requestedFilters];
    }

    /**
     * Get how much companines user has 
     *
     * @param App\Models\User|object $user
     * @return int
     */
    public function getUserCompaniesCount($user): int
    {
        list($filters, $bindings) = $this->createFilters();

        return DB::selectOne(
            "SELECT 
                count(*) as count 
            FROM $this->table comp
            WHERE user_id = :user_id $filters
        ",
            ['user_id' => $user->id] + $bindings
        )->count ?? 0;
    }
}
