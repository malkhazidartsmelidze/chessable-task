<?php

namespace App\Api\Company\Controllers;

use App\Models\Company;
use App\Models\Department;
use App\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use App\Api\Company\Requests\CreateCompanyRequest;
use App\Api\Company\Requests\DeleteCompanyRequest;
use App\Api\Company\Requests\UpdateCompanyRequest;
use App\Response\NotificateUser;

class CompanyResourceController
{
    /**
     * Companies Table
     * @var string
     */
    private $companies_table = Company::TABLE;
    private $employees_table = Employee::TABLE;
    private $departments_table = Department::TABLE;

    public function save(CreateCompanyRequest $request)
    {
        DB::insert("INSERT INTO {$this->companies_table}(
            user_id, name, code, address, phone_number, email
        ) VALUES (:user_id, :name, :code, :address, :phone_number, :email)", [
            'name'         => $request->getName(),
            'code'         => $request->getCode(),
            'address'      => $request->getAddress(),
            'phone_number' => $request->getPhoneNumber(),
            'email'        => $request->getEmail(),
            'user_id'      => $request->user()->id
        ]);

        return NotificateUser::create('Company Successfylly Saved');
    }

    public function udpate(UpdateCompanyRequest $request)
    {
        DB::update(
            "UPDATE {$this->companies_table} 
            SET user_id = :user_id,
                name = :name,
                code = :code,
                address = :address,
                phone_number = :phone_number,
                email = :email
            WHERE id = :id",
            [
                'id'           => $request->getId(),
                'name'         => $request->getName(),
                'code'         => $request->getCode(),
                'address'      => $request->getAddress(),
                'phone_number' => $request->getPhoneNumber(),
                'email'        => $request->getEmail(),
                'user_id'      => $request->user()->id
            ]
        );

        return NotificateUser::create('Company Successfylly Updated');
    }

    public function getSingle($id)
    {
        $company = DB::select("SELECT * FROM $this->companies_table WHERE id = ?", [$id]);

        return (array) $company[0];
    }

    public function delete($id)
    {
        DB::delete("DELETE FROM $this->companies_table WHERE id = ?", [$id]);

        return NotificateUser::create('Company Successfylly Deleted');
    }

    public function list()
    {
        $companies = DB::select("SELECT 
                id,
                name,
                code,
                address,
                IFNULL(dep.count,0) AS dep_count,
                IFNULL(dep.total_salary, 0) AS total_salary,
                IFNULL(dep.total_employee, 0) AS total_employee
            FROM $this->companies_table
            
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
            ) dep ON dep.company_id = {$this->companies_table}.id
        ");

        return response()->json([
            'data' => $companies,
            'page' => 1,
            'totalCount' => 122,
        ]);
    }
}
