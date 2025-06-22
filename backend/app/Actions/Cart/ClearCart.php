<?php

declare(strict_types=1);

namespace App\Actions\Cart;

use App\Models\UserCartProduct;
use Illuminate\Support\Facades\DB;

final class ClearCart
{
    /**
     * Remove all products from the user's cart.
     *
     * @param  int  $userId  The ID of the user
     * @return int Number of items removed
     */
    public function execute(int $userId): int
    {
        return DB::transaction(function () use ($userId) {
            return UserCartProduct::where('user_id', $userId)->delete();
        });
    }
}
