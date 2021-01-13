<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::insert('INSERT 
            INTO users(name,email,password) 
            VALUES (:name, :email, :password)
        ', [
            'name' => 'demo',
            'email' => 'demo@demo.com',
            'password' => bcrypt('demodemo123')
        ]);
    }
}
