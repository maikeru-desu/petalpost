<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Actions\Cart\AddToCart;
use App\Actions\Cart\ClearCart;
use App\Actions\Cart\GetCartItems;
use App\Actions\Cart\RemoveFromCart;
use App\Http\Controllers\Controller;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
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
        try {
            $userId = Auth::id();
            $cartItems = $action->execute($userId);

            $metaData = [
                'total_items' => $cartItems->sum('quantity'),
                'total_price' => $cartItems->sum(function ($item) {
                    return $item->quantity * $item->product->price;
                }),
            ];

            return $this->responseWithMeta($cartItems, $metaData, 'Cart items retrieved successfully');
        } catch (Exception $e) {
            return $this->errorResponse('Failed to retrieve cart items');
        }
    }

    /**
     * Add a product to the user's cart or update quantity.
     */
    public function addOrUpdate(int $productId, Request $request, AddToCart $action): JsonResponse
    {
        try {
            $request->validate([
                'quantity' => 'required|integer|min:1',
            ]);

            $userId = Auth::id();
            $cartItem = $action->execute($userId, $productId, $request->quantity);

            return $this->successResponse($cartItem, 'Product added to cart successfully');
        } catch (Exception $e) {
            return $this->errorResponse('Failed to add product to cart');
        }
    }

    /**
     * Remove a product from the user's cart.
     */
    public function remove(int $productId, RemoveFromCart $action): JsonResponse
    {
        try {
            $userId = Auth::id();
            $action->execute($userId, $productId);

            return $this->successResponse(null, 'Product removed from cart successfully');
        } catch (ModelNotFoundException $e) {
            return $this->errorResponse('Product not found in cart', 404);
        } catch (Exception $e) {
            return $this->errorResponse('Failed to remove product from cart');
        }
    }

    /**
     * Clear the user's cart.
     */
    public function clear(ClearCart $action): JsonResponse
    {
        try {
            $userId = Auth::id();
            $itemsRemoved = $action->execute($userId);

            return $this->successResponse(['items_removed' => $itemsRemoved], 'Cart cleared successfully');
        } catch (Exception $e) {
            return $this->errorResponse('Failed to clear cart');
        }
    }
}
