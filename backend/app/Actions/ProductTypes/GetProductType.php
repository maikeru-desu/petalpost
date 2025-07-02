<?php

declare(strict_types=1);

namespace App\Actions\ProductTypes;

use App\Models\ProductType;

final class GetProductType
{
    /**
     * Execute the action to retrieve a specific product type.
     */
    public function execute(ProductType $productType): ProductType
    {
        // Load relationships if not already loaded
        return $productType->loadMissing('products');
    }
}
