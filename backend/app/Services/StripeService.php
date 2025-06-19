<?php

declare(strict_types=1);

namespace App\Services;

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
}
