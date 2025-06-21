<?php

declare(strict_types=1);

namespace App\Actions\Products;

use App\Models\Product;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

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
            if (isset($data['mini_description'])) {
                $product->mini_description = $data['mini_description'];
            }
            if (isset($data['description'])) {
                $product->description = $data['description'];
            }
            if (isset($data['price'])) {
                $product->price = $data['price'];
            }

            if (array_key_exists('image', $data)) {
                if ($product->image && Storage::disk('public')->exists('products/'.$product->image)) {
                    Storage::disk('public')->delete('products/'.$product->image);
                }

                $fileName = time().'_'.$data['image']->getClientOriginalName();
                $data['image']->storeAs('products', $fileName, 'public');
                $product->image = $fileName;
            }

            $product->save();

            if (isset($data['tags'])) {
                $product->tags()->sync($data['tags']);
            }

            return $product->fresh()->load(['productType', 'tags']);
        });
    }
}
