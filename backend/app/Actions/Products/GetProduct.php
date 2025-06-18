<?php

declare(strict_types=1);

namespace App\Actions\Products;

use App\Models\Product;
use Illuminate\Database\Eloquent\ModelNotFoundException;

final class GetProduct
{
    /**
     * Execute the action.
     *
     * @throws ModelNotFoundException
     */
    public function execute(string $id): Product
    {
        return Product::with(['productType', 'tags'])
            ->findOrFail($id);
    }
}
