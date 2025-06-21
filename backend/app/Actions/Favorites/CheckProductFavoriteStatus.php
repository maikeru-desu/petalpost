<?php

declare(strict_types=1);

namespace App\Actions\Favorites;

use App\Models\UserFavoriteProduct;

final class CheckProductFavoriteStatus
{
    /**
     * Check if a product is favorited by a user.
     *
     * @param  string  $userId  The ID of the user
     * @param  string  $productId  The ID of the product to check
     * @return bool Whether the product is favorited by the user
     */
    public function execute(string $userId, string $productId): bool
    {
        return UserFavoriteProduct::where('user_id', $userId)
            ->where('product_id', $productId)
            ->exists();
    }
}
