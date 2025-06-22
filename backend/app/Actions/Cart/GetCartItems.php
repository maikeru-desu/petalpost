<?php

declare(strict_types=1);

namespace App\Actions\Cart;

use App\Models\User;
use Illuminate\Database\Eloquent\Collection;

final class GetCartItems
{
    /**
     * Get all cart items for a user with product details.
     * 
     * @param int $userId The ID of the user
     * @return Collection Collection of cart items with products
     */
    public function execute(int $userId): Collection
    {
        $user = User::findOrFail($userId);
        
        return $user->cartItems()
            ->with(['product' => function ($query) {
                $query->with(['productType', 'tags']);
            }])
            ->get();
    }
}
