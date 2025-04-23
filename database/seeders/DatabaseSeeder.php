<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $this->call(UserSeeder::class);
        $this->call(ThreadSeeder::class);
        $this->call(CommentSeeder::class);

        DB::table('users')->insert([
            'name' => 'Lola',
            'email' => 'lola@gmail.com',
            'email_verified_at' => now(),
            'password' => Hash::make('ps'),
            'remember_token' => Str::random(10),
            'created_at' => date("Y-m-d"),
        ]);
    }
}
