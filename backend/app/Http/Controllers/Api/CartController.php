<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Actions\Cart\AddToCart;
use App\Actions\Cart\ClearCart;
use App\Actions\Cart\GetCartItems;
use App\Actions\Cart\RemoveFromCart;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

final class CartController extends Controller
{
    /**
     * Get all cart items for the authenticated user.
     */
    public function index(GetCartItems $action): JsonResponse
    {
        $userId = Auth::id();
        $cartItems = $action->execute($userId);

        return response()->json([
            'data' => $cartItems,
            'total_items' => $cartItems->sum('quantity'),
            'total_price' => $cartItems->sum(function ($item) {
                return $item->quantity * $item->product->price;
            }),
        ]);
    }

    /**
     * Add a product to the user's cart or update quantity.
     */
    public function addOrUpdate(int $productId, Request $request, AddToCart $action): JsonResponse
    {
        $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        $userId = Auth::id();
        $cartItem = $action->execute($userId, $productId, $request->quantity);

        return response()->json([
            'message' => 'Product added to cart successfully',
            'data' => $cartItem,
        ]);
    }

    /**
     * Remove a product from the user's cart.
     */
    public function remove(int $productId, RemoveFromCart $action): JsonResponse
    {
        $userId = Auth::id();
        $success = $action->execute($userId, $productId);

        if ($success) {
            return response()->json(['message' => 'Product removed from cart successfully']);
        }

        return response()->json(['message' => 'Product not found in cart'], 404);
    }

    /**
     * Clear the user's cart.
     */
    public function clear(ClearCart $action): JsonResponse
    {
        $userId = Auth::id();
        $itemsRemoved = $action->execute($userId);

        return response()->json([
            'message' => 'Cart cleared successfully',
            'items_removed' => $itemsRemoved,
        ]);
    }
}
