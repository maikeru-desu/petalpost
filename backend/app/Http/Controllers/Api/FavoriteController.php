<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Actions\Favorites\CheckProductFavoriteStatus;
use App\Actions\Favorites\GetUserFavorites;
use App\Actions\Favorites\ToggleFavoriteProduct;
use App\Http\Controllers\Controller;
use App\Models\Product;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

final class FavoriteController extends Controller
{
    /**
     * Toggle favorite status of a product for the authenticated user.
     */
    public function toggle(Product $product, ToggleFavoriteProduct $action): JsonResponse
    {
        try {
            $userId = Auth::id();
            $result = $action->execute($userId, $product->id);

            return $this->successResponse($result);
        } catch (Exception $e) {
            return $this->errorResponse('Failed to toggle favorite status');
        }
    }

    /**
     * Get all favorite products of the authenticated user.
     */
    public function index(Request $request, GetUserFavorites $action): JsonResponse
    {
        $userId = Auth::id();
        $favorites = $action->execute($userId, $request->all());

        return $this->paginatedResponse($favorites, 'Favorites retrieved successfully');
    }

    /**
     * Check if a product is favorited by the authenticated user.
     */
    public function check(Product $product, CheckProductFavoriteStatus $action): JsonResponse
    {
        $userId = Auth::id();
        $isFavorited = $action->execute($userId, $product->id);

        return $this->successResponse(['is_favorited' => $isFavorited], 'Favorite status checked successfully');
    }
}
