<?php

declare(strict_types=1);

namespace App\Actions\Products;

use App\Models\Product;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\DB;

final class UpdateProduct
{
    /**
     * Execute the action.
     *
     * @param  array<string, mixed>  $data
     *
     * @throws ModelNotFoundException
     */
    public function execute(string $id, array $data): Product
    {
        return DB::transaction(function () use ($id, $data) {
            $product = Product::findOrFail($id);

            if (isset($data['type_id'])) {
                $product->type_id = $data['type_id'];
            }
            if (isset($data['name'])) {
                $product->name = $data['name'];
            }
            if (isset($data['description'])) {
                $product->description = $data['description'];
            }
            if (isset($data['price'])) {
                $product->price = $data['price'];
            }
            if (array_key_exists('image', $data)) {
                $product->image = $data['image'];
            }

            $product->save();

            if (isset($data['tags'])) {
                $product->tags()->sync($data['tags']);
            }

            return $product->fresh()->load(['productType', 'tags']);
        });
    }
}
