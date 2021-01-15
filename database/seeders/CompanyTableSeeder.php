<?php

namespace Database\Seeders;

use App\Models\Company;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Generator as Faker;

class CompanyTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(Faker $faker)
    {
        $companies_table = Company::TABLE;

        DB::insert("INSERT INTO 
            `$companies_table`(user_id, name, code, address, email, phone_number)
            VALUES (:user_id, :name, :code, :address, :email, :phone_number)
        ", [
            'user_id' => 1,
            'name' => 'Alphabet Inc.',
            'code' => 'GOOGL',
            'address' => 'California',
            'email' => $faker->email,
            'phone_number' => $faker->phoneNumber,
        ]);

        DB::insert("INSERT INTO 
            `$companies_table`(user_id, name, code, address, email, phone_number)
            VALUES (:user_id, :name, :code, :address, :email, :phone_number)
        ", [
            'user_id' => 1,
            'name' => 'Facebook Inc.',
            'code' => 'FB',
            'address' => 'Menlo Park, California, U.S.',
            'email' => $faker->email,
            'phone_number' => $faker->phoneNumber,
        ]);

        DB::insert("INSERT INTO 
            `$companies_table`(user_id, name, code, address, email, phone_number)
            VALUES (:user_id, :name, :code, :address, :email, :phone_number)
        ", [
            'user_id' => 1,
            'name' => 'Tesla Motors, Inc.',
            'code' => 'TSLA',
            'address' => 'Palo Alto, California, United States',
            'email' => $faker->email,
            'phone_number' => $faker->phoneNumber,
        ]);
    }
}
