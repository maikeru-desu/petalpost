<?php

declare(strict_types=1);

namespace App\Actions\Favorites;

use App\Models\Product;
use App\Models\User;
use App\Models\UserFavoriteProduct;

final class ToggleFavoriteProduct
{
    /**
     * Toggle a product as favorited/unfavorited by a user.
     *
     * @param  string  $userId  The ID of the user
     * @param  string  $productId  The ID of the product to toggle
     * @return array Response with status and whether product is now favorited
     */
    public function execute(string $userId, string $productId): array
    {
        $user = User::findOrFail($userId);
        $product = Product::findOrFail($productId);

        $favorite = UserFavoriteProduct::where('user_id', $userId)
            ->where('product_id', $productId)
            ->first();

        if ($favorite) {
            // If already favorited, remove it
            $favorite->delete();

            return [
                'status' => 'success',
                'favorited' => false,
                'message' => 'Product removed from favorites',
            ];
        }
        // If not favorited, add it
        UserFavoriteProduct::create([
            'user_id' => $userId,
            'product_id' => $productId,
        ]);

        return [
            'status' => 'success',
            'favorited' => true,
            'message' => 'Product added to favorites',
        ];

    }
}
