<?php

declare(strict_types=1);

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

final class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'password',
        'phone',
        'address',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the user's favorite products.
     */
    public function favoriteProducts(): BelongsToMany
    {
        return $this->belongsToMany(Product::class, 'user_favorite_products')
            ->withTimestamps();
    }

    /**
     * Get the user's favorite product entries.
     */
    public function favorites(): HasMany
    {
        return $this->hasMany(UserFavoriteProduct::class);
    }
    
    /**
     * Get all cart products for this user.
     */
    public function cartProducts(): BelongsToMany
    {
        return $this->belongsToMany(Product::class, 'user_cart_products')
            ->withPivot('quantity')
            ->withTimestamps();
    }
    
    /**
     * Get all user cart items.
     */
    public function cartItems(): HasMany
    {
        return $this->hasMany(UserCartProduct::class);
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
}
