<?php

declare(strict_types=1);

namespace App\Actions\Cart;

use App\Models\UserCartProduct;
use Illuminate\Support\Facades\DB;

final class RemoveFromCart
{
    /**
     * Remove a product from the user's cart.
     *
     * @param  int  $userId  The ID of the user
     * @param  int  $productId  The ID of the product
     * @return bool True if successful, false otherwise
     */
    public function execute(int $userId, int $productId): bool
    {
        return DB::transaction(function () use ($userId, $productId) {
            $deleted = UserCartProduct::where('user_id', $userId)
                ->where('product_id', $productId)
                ->delete();

            return $deleted > 0;
        });
    }
}
