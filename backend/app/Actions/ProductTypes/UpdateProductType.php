<?php

declare(strict_types=1);

namespace App\Actions\ProductTypes;

use App\Models\ProductType;
use Illuminate\Support\Facades\DB;

final class UpdateProductType
{
    /**
     * Execute the action to update an existing product type.
     *
     * @param  array<string, mixed>  $data
     */
    public function execute(int|string $id, array $data): ProductType
    {
        return DB::transaction(function () use ($id, $data) {
            $productType = ProductType::findOrFail($id);

            $productType->update([
                'name' => $data['name'],
            ]);

            return $productType->fresh();
        });
    }
}
