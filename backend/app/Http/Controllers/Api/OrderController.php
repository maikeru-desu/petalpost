<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Actions\Cart\ClearCart;
use App\Actions\Order\CreateOrder;
use App\Actions\Order\ListOrder;
use App\Http\Controllers\Controller;
use App\Http\Requests\CreateOrderRequest;
use App\Models\Order;
use App\Traits\ApiResponseTrait;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    use ApiResponseTrait;

    /**
     * Display a listing of the user's orders.
     */
    public function index(Request $request, ListOrder $action): JsonResponse
    {
        try {
            $orders = $action->execute($request->all());
            return $this->paginatedResponse($orders, 'Orders retrieved successfully');
        } catch (\Exception $e) {
            return $this->errorResponse(
                'Failed to retrieve orders: ' . $e->getMessage(),
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }
    }

    /**
     * Store a newly created order.
     */
    public function store(CreateOrderRequest $request, CreateOrder $action, ClearCart $clearCartAction): JsonResponse
    {
        try {
            $userId = Auth::id();
            $validatedData = $request->validated();
            
            $result = $action->execute(
                $userId,
                $validatedData['items'],
                $validatedData['billing_address'],
                $validatedData['shipping_address']
            );

            $clearCartAction->execute($userId);
            
            return $this->successResponse(
                $result,
                'Order created successfully',
                Response::HTTP_CREATED
            );
        } catch (ModelNotFoundException $e) {
            return $this->errorResponse(
                $e->getMessage(),
                Response::HTTP_NOT_FOUND
            );
        } catch (\Exception $e) {
            return $this->errorResponse(
                'Failed to create order: ' . $e->getMessage(),
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }
    }

    /**
     * Display the specified order.
     */
    public function show(Order $order): JsonResponse
    {
        try {
            $userId = Auth::id();
            
            // Check if the order belongs to the authenticated user
            if ($order->user_id !== $userId) {
                return $this->errorResponse('Unauthorized access to order', Response::HTTP_FORBIDDEN);
            }
            
            // Load relationships
            $order->load('items.product');
            
            return $this->successResponse(
                $order,
                'Order retrieved successfully'
            );
        } catch (\Exception $e) {
            return $this->errorResponse(
                'Failed to retrieve order: ' . $e->getMessage(),
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }
    }
    
    /**
     * Update order payment status based on Stripe webhook.
     * Note: This would typically be handled in a dedicated WebhookController
     * with proper signature verification, but simplified for this example.
     */
    public function updatePaymentStatus(Request $request, Order $order): JsonResponse
    {
        try {
            $paymentStatus = $request->input('payment_status');
            
            $order->update([
                'payment_status' => $paymentStatus,
                'status' => $paymentStatus === 'succeeded' ? 'paid' : 'payment_failed',
            ]);
            
            return $this->successResponse(
                $order->refresh(),
                'Order payment status updated successfully'
            );
        } catch (\Exception $e) {
            return $this->errorResponse(
                'Failed to update order payment status: ' . $e->getMessage(),
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }
    }
    
    /**
     * Cancel an order.
     */
    public function cancel(Request $request, Order $order): JsonResponse
    {
        try {
            $userId = Auth::id();
            
            // Check if the order belongs to the authenticated user and is in pending status
            if ($order->user_id !== $userId) {
                return $this->errorResponse('Unauthorized access to order', Response::HTTP_FORBIDDEN);
            }
            
            if ($order->status !== 'pending') {
                return $this->errorResponse('Only pending orders can be cancelled', Response::HTTP_BAD_REQUEST);
            }
            
            $reason = $request->input('reason', 'Cancelled by customer');
            
            $order->update([
                'status' => 'cancelled',
                'cancelled_at' => now(),
                'cancellation_reason' => $reason,
            ]);
            
            return $this->successResponse(
                $order->refresh(),
                'Order cancelled successfully'
            );
        } catch (ModelNotFoundException $e) {
            return $this->errorResponse(
                'Order not found or cannot be cancelled',
                Response::HTTP_NOT_FOUND
            );
        } catch (\Exception $e) {
            return $this->errorResponse(
                'Failed to cancel order: ' . $e->getMessage(),
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }
    }
}
