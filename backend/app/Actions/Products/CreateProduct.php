<?php

declare(strict_types=1);

namespace App\Actions\Products;

use App\Models\Product;
use App\Services\StripeService;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;

final class CreateProduct
{
    public function __construct(private StripeService $stripeService) {}

    /**
     * Execute the action.
     *
     * @param  array<string, mixed>  $data
     */
    public function execute(array $data): Product
    {
        return DB::transaction(function () use ($data) {
            // Handle image file upload
            $imageName = null;

            if (isset($data['image']) && $data['image'] instanceof UploadedFile) {
                $fileName = time().'_'.$data['image']->getClientOriginalName();
                $data['image']->storeAs('products', $fileName, 'public');
                $imageName = $fileName;
            } elseif (isset($data['image']) && is_string($data['image'])) {
                $imageName = $data['image'];
            }

            $stripeProduct = $this->stripeService->createProductWithPrice($data['name'], $data['price'] * 100);

            $product = Product::create([
                'type_id' => $data['type_id'],
                'name' => $data['name'],
                'mini_description' => $data['mini_description'],
                'description' => $data['description'],
                'price' => $data['price'],
                'image' => $imageName,
                'stripe_product_id' => $stripeProduct['product_id'],
                'stripe_price_id' => $stripeProduct['price_id'],
            ]);

            if (! empty($data['tags'])) {
                $product->tags()->attach($data['tags']);
            }

            return $product->load(['productType', 'tags']);
        });
    }
}
