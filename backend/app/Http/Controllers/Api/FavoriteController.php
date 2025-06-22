<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Actions\Favorites\CheckProductFavoriteStatus;
use App\Actions\Favorites\GetUserFavorites;
use App\Actions\Favorites\ToggleFavoriteProduct;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

final class FavoriteController extends Controller
{
    /**
     * Toggle favorite status of a product for the authenticated user.
     */
    public function toggle(Request $request, int $productId): JsonResponse
    {
        $userId = Auth::id();
        $result = (new ToggleFavoriteProduct())->execute($userId, $productId);

        return response()->json($result);
    }

    /**
     * Get all favorite products of the authenticated user.
     */
    public function index(Request $request): JsonResponse
    {
        $userId = Auth::id();
        $favorites = (new GetUserFavorites())->execute($userId, $request->all());

        return response()->json($favorites);
    }

    /**
     * Check if a product is favorited by the authenticated user.
     */
    public function check(Request $request, int $productId): JsonResponse
    {
        $userId = Auth::id();
        $isFavorited = (new CheckProductFavoriteStatus())->execute($userId, $productId);

        return response()->json([
            'favorited' => $isFavorited,
        ]);
    }
}
