<?php

declare(strict_types=1);

namespace App\Services;

use Stripe\Checkout\Session;
use Stripe\Exception\ApiErrorException;
use Stripe\PaymentIntent;
use Stripe\Price as StripePrice;
use Stripe\Product as StripeProduct;
use Stripe\Stripe;

final class StripeService
{
    public function __construct()
    {
        Stripe::setApiKey(config('services.stripe.secret_key'));
    }

    public function createProductWithPrice(string $name, int $amountInCents, string $currency = 'usd'): array
    {
        $product = StripeProduct::create([
            'name' => $name,
        ]);

        $price = StripePrice::create([
            'product' => $product->id,
            'unit_amount' => $amountInCents,
            'currency' => $currency,
        ]);

        return [
            'product_id' => $product->id,
            'price_id' => $price->id,
        ];
    }

    public function deleteAllStripeProducts(): void
    {
        $products = StripeProduct::all();

        foreach ($products->data as $product) {
            $prices = StripePrice::all([
                'product' => $product->id,
            ]);

            foreach ($prices->data as $price) {
                StripePrice::update($price->id, ['active' => false]);
            }

            $product->delete();
        }
    }
    
    /**
     * Create payment intent for order processing
     * 
     * @param int $amountInCents Total order amount in cents
     * @param string $currency Currency code
     * @param string $description Order description
     * @param array $metadata Additional metadata
     * @return array Payment intent details
     * @throws ApiErrorException
     */
    public function createPaymentIntent(int $amountInCents, string $currency = 'usd', string $description = '', array $metadata = []): array
    {
        $paymentIntent = PaymentIntent::create([
            'amount' => $amountInCents,
            'currency' => $currency,
            'description' => $description,
            'metadata' => $metadata,
            'automatic_payment_methods' => [
                'enabled' => true,
            ],
        ]);
        
        return [
            'id' => $paymentIntent->id,
            'client_secret' => $paymentIntent->client_secret,
            'status' => $paymentIntent->status,
            'amount' => $paymentIntent->amount,
            'currency' => $paymentIntent->currency,
        ];
    }
    
    /**
     * Create a checkout session for order processing
     * 
     * @param array $lineItems Line items for the checkout
     * @param string $successUrl URL to redirect after successful payment
     * @param string $cancelUrl URL to redirect if payment is cancelled
     * @param array $metadata Additional metadata
     * @return array Checkout session details
     * @throws ApiErrorException
     */
    public function createCheckoutSession(array $lineItems, string $successUrl, string $cancelUrl, array $metadata = []): array
    {
        $session = Session::create([
            'line_items' => $lineItems,
            'mode' => 'payment',
            'success_url' => $successUrl,
            'cancel_url' => $cancelUrl,
            'metadata' => $metadata,
        ]);
        
        return [
            'id' => $session->id,
            'url' => $session->url,
            'payment_status' => $session->payment_status,
            'status' => $session->status,
        ];
    }
}
