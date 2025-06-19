<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\Product;
use App\Models\ProductType;
use App\Models\Tag;
use App\Services\StripeService;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

final class ProductSeeder extends Seeder
{
    public function __construct(private StripeService $stripeService) {}

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
                'mini_description' => 'A beautiful arrangement of red roses',
                'description' => 'A beautiful arrangement of red roses, perfect for expressing love.',
                'price' => 49.99,
                'tags' => [$valentinesTag, $forHerTag, $flowerTag],
                'image' => $this->storeImage('roseelegance.jpg'),
            ],
            [
                'type_id' => $bouquets->id,
                'name' => 'Spring Bliss',
                'mini_description' => 'Colorful spring flowers',
                'description' => 'Colorful spring flowers to brighten any room or occasion.',
                'price' => 39.99,
                'tags' => [$birthdayTag, $flowerTag],
                'image' => $this->storeImage('springbliss.jpg'),
            ],
            [
                'type_id' => $pottedPlants->id,
                'name' => 'Peaceful Lily',
                'mini_description' => 'A peace lily plant',
                'description' => 'A peace lily plant that brings tranquility to any space.',
                'price' => 29.99,
                'tags' => [$forHerTag, $forHimTag],
                'image' => $this->storeImage('peacelily.jpg'),
            ],
            [
                'type_id' => $giftBaskets->id,
                'name' => 'Flower & Chocolate',
                'mini_description' => 'beautiful flowers and delicious chocolates.',
                'description' => 'The perfect combination of beautiful flowers and delicious chocolates.',
                'price' => 69.99,
                'tags' => [$valentinesTag, $birthdayTag],
                'image' => $this->storeImage('flowerchocolate.jpg'),
            ],
            [
                'type_id' => $accessories->id,
                'name' => 'Flower Plush Toy',
                'mini_description' => 'A cute flower plush toy',
                'description' => 'A cute plush toy in the shape of a flower.',
                'price' => 19.99,
                'tags' => [$toysTag, $forHerTag, $birthdayTag],
                'image' => $this->storeImage('flowerplush.jpg'),
            ],
        ];

        foreach ($products as $productData) {
            $tags = $productData['tags'];
            unset($productData['tags']);

            $stripeProduct = $this->stripeService->createProductWithPrice($productData['name'], (int) $productData['price'] * 100);
            $productData['stripe_product_id'] = $stripeProduct['product_id'];
            $productData['stripe_price_id'] = $stripeProduct['price_id'];

            $product = Product::create($productData);
            $product->tags()->attach($tags);
        }
    }

    private function storeImage(string $imageName)
    {
        $file = File::get(public_path('products/'.$imageName));
        $fileName = time().'_'.$imageName;
        Storage::put('products/'.$fileName, $file);

        return $fileName;
    }
}
