<?php

namespace Database\Seeders;

use App\Models\Company;
use App\Models\Department;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DepartmentTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $departments_table = Department::TABLE;
        $companies_table = Company::TABLE;

        $companies = DB::select("SELECT id FROM `$companies_table`");
        $departments = [
            'Production',
            'Research and Development',
            'Purchasing',
            'Information Technology',
            'Marketing',
            'Human Resource Management',
            'Accounting and Finance.',
        ];

        foreach ($companies as $company) {
            foreach ($departments as $department_name) {
                DB::insert("INSERT INTO 
                    `$departments_table`(company_id, name)
                    VALUES(:company_id, :name)
                ", [
                    'company_id' => $company->id,
                    'name' => $department_name
                ]);
            }
        }
    }
}
