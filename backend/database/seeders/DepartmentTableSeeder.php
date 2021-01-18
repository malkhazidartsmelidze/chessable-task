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

        $departments = [
            'Production',
            'Research and Development',
            'Purchasing',
            'Information Technology',
            'Marketing',
            'Human Resource Management',
            'Accounting and Finance.',
        ];

        foreach ($departments as $department_name) {
            DB::insert("INSERT INTO 
                    `$departments_table`(name)
                    VALUES(:name)
                ", [
                'name' => $department_name
            ]);
        }
    }
}
