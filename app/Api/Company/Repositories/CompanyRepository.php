<?php

namespace App\Api\Company\Repositories;

use App\Helpers\Repository;
use App\Models\Company;
use App\Models\Department;
use App\Models\Employee;
use App\Traits\HasSimpleCrudActions;
use Illuminate\Support\Facades\DB;

class CompanyRepository extends Repository
{
    use HasSimpleCrudActions;

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

    /**
     * Delete Company 
     *
     * @param int $id
     * @return void
     */
    public function delete($id)
    {
        DB::delete("DELETE FROM $this->table WHERE id = ?", [$id]);
    }

    /**
     * Select Company By Id 
     *
     * @param int $id
     * @return mixed
     */
    public function selectOneById($id)
    {
        $company = DB::selectOne("SELECT * FROM $this->table WHERE id = ?", [$id]);
        return $company;
    }

    /**
     * Update Company By Id
     *
     * @param int $id
     * @param array $data
     * @return mixed
     */
    public function update(int $id, array $data)
    {
        $setStatements = $this->getColumnsAndBindingsForUpdate(array_keys($data));

        DB::update(
            "UPDATE $this->table SET $setStatements WHERE id = :id",
            ['id' => $id] + $data
        );
    }

    /**
     * Create Company
     *
     * @param array $data
     * @return void
     */
    public function create(array $data)
    {
        $columnsAndBindings = $this->getColumnsAndBindingsForInsert(array_keys($data));

        DB::insert("INSERT INTO {$this->table} $columnsAndBindings", array_values($data));
    }
}
