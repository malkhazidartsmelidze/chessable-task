<?php

namespace Database\Seeders;

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

        $departments = DB::select("SELECT id FROM `$departments_table`");

        foreach ($departments as $department) {
            foreach (range(1, rand(5, 12)) as $_) {
                DB::insert("INSERT INTO 
                    `$employees_table`(department_id,name,lastname,address,bank_account,salary)
                    VALUES (:department_id,:name,:lastname,:address,:bank_account,:salary)
                ", [
                    'department_id' => $department->id,
                    'name'          => $faker->name,
                    'lastname'      => $faker->lastname,
                    'address'       => $faker->address,
                    'bank_account'  => Str::random(25),
                    'salary'        => round(rand(20000, 70000), -3),
                ]);
            }
        }
    }
}