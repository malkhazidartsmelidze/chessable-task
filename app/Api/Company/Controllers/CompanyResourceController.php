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
    public function save(CreateCompanyRequest $request)
    {
        $companies_table = Company::TABLE;

        DB::insert("INSERT INTO $companies_table(
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
        return $request->all();
    }

    public function delete(DeleteCompanyRequest $request)
    {
        return $request->all();
    }

    public function list()
    {
        $companies_table = Company::TABLE;
        $departments_table = Department::TABLE;
        $employees_table = Employee::TABLE;

        $companies = DB::select("SELECT 
                id,
                name,
                code,
                address,
                IFNULL(dep.count,0) AS dep_count,
                IFNULL(dep.total_salary, 0) AS total_salary,
                IFNULL(dep.total_employee, 0) AS total_employee
            FROM `$companies_table`
            
            # Get Total Departments With metadata
            LEFT JOIN (
                SELECT 
                    count(*) as count,
                    SUM(emp.salary_sum) as total_salary,
                    SUM(emp.count) as total_employee,
                    company_id
                FROM $departments_table 
                
                # Get Total employees and employee salary
                LEFT JOIN (
                    SELECT 
                        count(*) as count,
                        sum(salary) as salary_sum,
                        department_id
                    FROM $employees_table
                    GROUP BY department_id
                ) emp ON emp.department_id = $departments_table.id

                GROUP BY company_id
            ) dep ON dep.company_id = $companies_table.id
        ");

        return response()->json([
            'data' => $companies,
            'page' => 1,
            'totalCount' => 12,
        ]);
    }
}
