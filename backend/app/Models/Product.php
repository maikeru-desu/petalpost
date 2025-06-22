<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

final class Product extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'type_id',
        'image',
        'name',
        'mini_description',
        'description',
        'price',
        'stripe_product_id',
        'stripe_price_id',
    ];

    /**
     * Get the product type that owns the product.
     */
    public function productType(): BelongsTo
    {
        return $this->belongsTo(ProductType::class, 'type_id');
    }

    /**
     * The tags that belong to the product.
     */
    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(Tag::class, 'product_tags');
    }

    /**
     * The orders that belong to the product.
     */
    public function orders(): BelongsToMany
    {
        return $this->belongsToMany(Order::class, 'order_products')
            ->withPivot('price')
            ->withTimestamps();
    }

    /**
     * The users who favorited this product.
     */
    public function favoritedBy(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'user_favorite_products')
            ->withTimestamps();
    }

    /**
     * Get all users who have this product in their cart.
     */
    public function inCartOf(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'user_cart_products')
            ->withPivot('quantity')
            ->withTimestamps();
    }
}
