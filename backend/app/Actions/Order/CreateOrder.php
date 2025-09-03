<?php

declare(strict_types=1);

namespace App\Actions\Order;

use App\Models\Order;
use App\Models\Product;
use App\Services\StripeService;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\DB;
use Stripe\Exception\ApiErrorException;

final class CreateOrder
{
    public function __construct(
        private StripeService $stripeService
    ) {}

    /**
     * Execute the action.
     *
     * @throws Exception
     */
    public function execute(
        int $userId,
        array $items,
        string $billingAddress,
        string $shippingAddress
    ): array {
        // Wrap everything in a transaction for data integrity
        return DB::transaction(function () use ($userId, $items, $billingAddress, $shippingAddress) {
            // Calculate total and build line items
            $total = 0;
            $orderItems = [];
            $stripeLineItems = [];

            foreach ($items as $item) {
                $productId = (int) $item['product_id'];
                $quantity = (int) $item['quantity'];

                // Find product or throw exception
                $product = Product::find($productId);
                if (! $product) {
                    throw new ModelNotFoundException("Product with ID {$productId} not found");
                }

                // Calculate subtotal for this item
                $subtotal = $product->price * $quantity;
                $total += $subtotal;

                // Store for later use
                $orderItems[] = [
                    'product_id' => $productId,
                    'quantity' => $quantity,
                    'unit_price' => $product->price,
                    'subtotal' => $subtotal,
                ];

                // Prepare Stripe line items
                $stripeLineItems[] = [
                    'price_data' => [
                        'currency' => 'usd',
                        'product_data' => [
                            'name' => $product->name,
                            'description' => $product->description,
                        ],
                        'unit_amount' => (int) ($product->price * 100), // Convert to cents
                    ],
                    'quantity' => $quantity,
                ];
            }

            // Create the order
            $order = Order::create([
                'user_id' => $userId,
                'total' => $total,
                'status' => 'pending',
                'billing_address' => $billingAddress,
                'shipping_address' => $shippingAddress,
            ]);

            // Create order items
            foreach ($orderItems as $item) {
                $order->items()->create($item);
            }

            // Create payment intent with Stripe
            try {
                $paymentIntent = $this->stripeService->createPaymentIntent(
                    amountInCents: (int) ($total * 100), // Convert to cents
                    currency: 'usd',
                    description: "Order #{$order->id}",
                    metadata: [
                        'order_id' => $order->id,
                    ]
                );

                // Update order with payment intent ID
                $order->update([
                    'payment_intent_id' => $paymentIntent['id'],
                    'payment_status' => $paymentIntent['status'],
                ]);

                return [
                    'order' => $order->refresh()->load('items.product'),
                    'payment' => $paymentIntent,
                ];
            } catch (ApiErrorException $e) {
                // Automatically rolled back by the transaction if exception occurs
                throw new Exception('Payment processing failed: '.$e->getMessage());
            }
        });
    }
}
