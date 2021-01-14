<?php

namespace Database\Seeders;

use App\Models\Company;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CompanyTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $companies_table = Company::TABLE;

        DB::insert("INSERT INTO 
            `$companies_table`(user_id, name, code,address)
            VALUES (:user_id, :name, :code, :address)
        ", [
            'user_id' => 1,
            'name' => 'Alphabet Inc.',
            'code' => 'GOOGL',
            'address' => 'California'
        ]);

        DB::insert("INSERT INTO 
            `$companies_table`(user_id, name, code,address)
            VALUES (:user_id, :name, :code, :address)
        ", [
            'user_id' => 1,
            'name' => 'Facebook Inc.',
            'code' => 'FB',
            'address' => 'Menlo Park, California, U.S.'
        ]);

        DB::insert("INSERT INTO 
            `$companies_table`(user_id, name, code,address)
            VALUES (:user_id, :name, :code, :address)
        ", [
            'user_id' => 1,
            'name' => 'Tesla Motors, Inc.',
            'code' => 'TSLA',
            'address' => 'Palo Alto, California, United States'
        ]);
    }
}
