<?php

declare(strict_types=1);

namespace App\Actions\Products;

use App\Models\Product;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\DB;

final class DeleteProduct
{
    /**
     * Execute the action.
     *
     * @throws ModelNotFoundException
     */
    public function execute(string $id): void
    {
        DB::transaction(function () use ($id) {
            $product = Product::findOrFail($id);

            $product->tags()->detach();

            $product->delete();
        });
    }
}
