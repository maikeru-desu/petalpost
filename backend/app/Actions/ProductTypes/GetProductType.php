<?php

declare(strict_types=1);

namespace App\Actions\ProductTypes;

use App\Models\ProductType;

final class GetProductType
{
    /**
     * Execute the action to retrieve a specific product type.
     */
    public function execute(int|string $id): ProductType
    {
        return ProductType::with('products')->findOrFail($id);
    }
}
