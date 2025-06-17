<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\ProductType;
use Illuminate\Database\Seeder;

class ProductTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $productTypes = [
            'Bouquets',
            'Potted Plants',
            'Gift Baskets',
            'Accessories',
        ];

        foreach ($productTypes as $type) {
            ProductType::create(['name' => $type]);
        }
    }
}
