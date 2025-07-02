<?php

declare(strict_types=1);

namespace App\Actions\Products;

use App\Models\Product;
use Illuminate\Database\Eloquent\ModelNotFoundException;

final class GetProduct
{
    /**
     * Execute the action.
     */
    public function execute(Product $product): Product
    {
        // Load relationships if not already loaded
        return $product->load(['productType', 'tags']);
    }
}
