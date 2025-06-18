<?php

declare(strict_types=1);

namespace App\Actions\ProductTypes;

use App\Models\ProductType;
use Illuminate\Support\Facades\DB;

final class CreateProductType
{
    /**
     * Execute the action to create a new product type.
     *
     * @param  array<string, mixed>  $data
     */
    public function execute(array $data): ProductType
    {
        return DB::transaction(function () use ($data) {
            $productType = ProductType::create([
                'name' => $data['name'],
            ]);

            return $productType;
        });
    }
}
