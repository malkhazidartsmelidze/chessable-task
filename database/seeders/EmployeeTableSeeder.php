<?php

namespace Database\Seeders;

use App\Models\Company;
use App\Models\Department;
use App\Models\Employee;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Generator as Faker;

class EmployeeTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(Faker $faker)
    {
        $departments_table = Department::TABLE;
        $employees_table = Employee::TABLE;
        $companies_table = Company::TABLE;

        $departments = DB::select("SELECT id FROM `$departments_table`");
        $companies = DB::select("SELECT id FROM `$companies_table`");

        foreach ($companies as $company) {
            foreach ($departments as $department) {
                foreach (range(1, rand(5, 12)) as $_) {
                    DB::insert("INSERT INTO 
                    `$employees_table`(department_id,company_id,name,lastname,address,bank_account,salary)
                    VALUES (:department_id,:company_id,:name,:lastname,:address,:bank_account,:salary)
                ", [
                        'company_id' => $company->id,
                        'department_id' => $department->id,
                        'name'          => $faker->name,
                        'lastname'      => $faker->lastname,
                        'address'       => $faker->address,
                        'bank_account'  => Str::random(25),
                        'salary'        => round(rand(20000, 55000), -3),
                    ]);
                }
            }
        }
    }
}
