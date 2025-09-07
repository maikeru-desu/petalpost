<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

final class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Seed the database with our flower shop data
        // The order is important because of relationships
        $this->call([
            RoleSeeder::class,
            ProductTypeSeeder::class,
            TagSeeder::class,
            ProductSeeder::class,
        ]);
    }
}
