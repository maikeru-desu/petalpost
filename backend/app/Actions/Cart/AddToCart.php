<?php

declare(strict_types=1);

namespace App\Actions\Cart;

use App\Models\Product;
use App\Models\User;
use App\Models\UserCartProduct;
use Illuminate\Support\Facades\DB;

final class AddToCart
{
    /**
     * Add a product to the user's cart or update quantity if already exists.
     * 
     * @param int $userId The ID of the user
     * @param int $productId The ID of the product
     * @param int $quantity The quantity to add (defaults to 1)
     * @return array Cart item data with product info
     */
    public function execute(int $userId, int $productId, int $quantity = 1): array
    {
        $user = User::findOrFail($userId);
        $product = Product::findOrFail($productId);
        
        return DB::transaction(function () use ($userId, $productId, $quantity, $product) {
            // Check if the product is already in the cart
            $cartItem = UserCartProduct::where('user_id', $userId)
                ->where('product_id', $productId)
                ->first();
                
            if ($cartItem) {
                // Update quantity
                $cartItem->quantity = $quantity;
                $cartItem->save();
            } else {
                // Create new cart item
                $cartItem = UserCartProduct::create([
                    'user_id' => $userId,
                    'product_id' => $productId,
                    'quantity' => $quantity,
                ]);
            }
            
            return [
                'id' => $cartItem->id,
                'product_id' => $product->id,
                'quantity' => $cartItem->quantity,
                'product' => $product->load('productType'),
            ];
        });
    }
}
