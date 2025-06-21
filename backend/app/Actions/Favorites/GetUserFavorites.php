<?php

declare(strict_types=1);

namespace App\Actions\Favorites;

use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

final class GetUserFavorites
{
    /**
     * Get all favorite products for a user with pagination.
     *
     * @param  string  $userId  The ID of the user
     * @param  array  $filters  Optional filters like per_page
     */
    public function execute(string $userId, array $filters = []): LengthAwarePaginator
    {
        $user = User::findOrFail($userId);

        $perPage = $filters['per_page'] ?? 12;

        return $user->favoriteProducts()
            ->with(['productType', 'tags'])
            ->orderBy('user_favorite_products.created_at', 'desc')
            ->paginate($perPage);
    }
}
