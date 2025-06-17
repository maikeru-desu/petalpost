<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\Product;
use App\Models\Tag;
use App\Models\ProductType;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get all product types
        $bouquets = ProductType::where('name', 'Bouquets')->first();
        $pottedPlants = ProductType::where('name', 'Potted Plants')->first();
        $giftBaskets = ProductType::where('name', 'Gift Baskets')->first();
        $accessories = ProductType::where('name', 'Accessories')->first();
        
        // Get all tags
        $birthdayTag = Tag::where('name', 'Birthday')->first();
        $forHerTag = Tag::where('name', 'For Her')->first();
        $forHimTag = Tag::where('name', 'For Him')->first();
        $valentinesTag = Tag::where('name', 'Valentines')->first();
        $flowerTag = Tag::where('name', 'Flower')->first();
        $toysTag = Tag::where('name', 'Toys')->first();
        
        // Create products
        $products = [
            [
                'type_id' => $bouquets->id,
                'name' => 'Rose Elegance',
                'description' => 'A beautiful arrangement of red roses, perfect for expressing love.',
                'price' => 49.99,
                'tags' => [$valentinesTag, $forHerTag, $flowerTag]
            ],
            [
                'type_id' => $bouquets->id,
                'name' => 'Spring Bliss',
                'description' => 'Colorful spring flowers to brighten any room or occasion.',
                'price' => 39.99,
                'tags' => [$birthdayTag, $flowerTag]
            ],
            [
                'type_id' => $pottedPlants->id,
                'name' => 'Peaceful Lily',
                'description' => 'A peace lily plant that brings tranquility to any space.',
                'price' => 29.99,
                'tags' => [$forHerTag, $forHimTag]
            ],
            [
                'type_id' => $giftBaskets->id,
                'name' => 'Flower & Chocolate',
                'description' => 'The perfect combination of beautiful flowers and delicious chocolates.',
                'price' => 69.99,
                'tags' => [$valentinesTag, $birthdayTag]
            ],
            [
                'type_id' => $accessories->id,
                'name' => 'Flower Plush Toy',
                'description' => 'A cute plush toy in the shape of a flower.',
                'price' => 19.99,
                'tags' => [$toysTag, $forHerTag, $birthdayTag]
            ],
        ];
        
        foreach ($products as $productData) {
            $tags = $productData['tags'];
            unset($productData['tags']);
            
            $product = Product::create($productData);
            $product->tags()->attach($tags);
        }
    }
}
