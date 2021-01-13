<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        if ($this->command->confirm('All Migrations will be refreshed')) {
            // Clear all tables and migrate fresh data
            $this->command->call('migrate:fresh');
            $this->command->line("Database cleared.");
        }

        $this->call(UsersTableSeeder::class);

        $this->command->info("Database seeded.");
    }
}
