<?php

declare(strict_types=1);

namespace App\Actions\Products;

use App\Models\Product;
use Illuminate\Support\Facades\DB;

final class CreateProduct
{
    /**
     * Execute the action.
     *
     * @param  array<string, mixed>  $data
     */
    public function execute(array $data): Product
    {
        return DB::transaction(function () use ($data) {
            $product = Product::create([
                'type_id' => $data['type_id'],
                'name' => $data['name'],
                'description' => $data['description'],
                'price' => $data['price'],
                'image' => $data['image'] ?? null,
            ]);

            if (! empty($data['tags'])) {
                $product->tags()->attach($data['tags']);
            }

            return $product->load(['productType', 'tags']);
        });
    }
}
