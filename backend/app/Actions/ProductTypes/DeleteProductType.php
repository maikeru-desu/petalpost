<?php

declare(strict_types=1);

namespace App\Actions\ProductTypes;

use App\Models\ProductType;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

final class DeleteProductType
{
    /**
     * Execute the action to delete a product type.
     *
     * @throws ValidationException
     */
    public function execute(int|string $id): void
    {
        $productType = ProductType::findOrFail($id);

        // Check if the product type has associated products
        if ($productType->products()->count() > 0) {
            throw ValidationException::withMessages([
                'id' => ['Cannot delete product type with associated products.'],
            ])->status(Response::HTTP_CONFLICT);
        }

        DB::transaction(function () use ($productType) {
            $productType->delete();
        });
    }
}
