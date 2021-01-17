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

        return DB::select("SELECT 
                id,
                name,
                code,
                address,
                IFNULL(dep.count,0) AS dep_count,
                IFNULL(dep.total_salary, 0) AS total_salary,
                IFNULL(dep.total_employee, 0) AS total_employee
            FROM $this->table
            
            # Get Total Departments With metadata
            LEFT JOIN (
                SELECT 
                    count(*) as count,
                    SUM(emp.salary_sum) as total_salary,
                    SUM(emp.count) as total_employee,
                    company_id
                FROM $this->departments_table 
                
                # Get Total employees and employee salary
                LEFT JOIN (
                    SELECT 
                        count(*) as count,
                        sum(salary) as salary_sum,
                        department_id
                    FROM $this->employees_table
                    GROUP BY department_id
                ) emp ON emp.department_id = $this->departments_table.id

                GROUP BY company_id
            ) dep ON dep.company_id = {$this->table}.id
            
            WHERE user_id = ?
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
    public function getUserCompaniesCount($user): int
    {
        return DB::selectOne(
            "SELECT 
            count(*) as count 
        FROM $this->table 
        WHERE user_id = ?",
            [
                $user->id
            ]
        )->count ?? 0;
    }
}
