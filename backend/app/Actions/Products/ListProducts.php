<?php

declare(strict_types=1);

namespace App\Actions\Products;

use App\Models\Product;
use Illuminate\Pagination\LengthAwarePaginator;

final class ListProducts
{
    /**
     * Execute the action.
     *
     * @param  array<string, mixed>  $filters
     */
    public function execute(array $filters = []): LengthAwarePaginator
    {
        $query = Product::query();

        // Apply filters
        if (isset($filters['type_id'])) {
            $query->where('type_id', $filters['type_id']);
        }

        if (isset($filters['search'])) {
            $query->where(function ($q) use ($filters) {
                $search = '%'.$filters['search'].'%';
                $q->where('name', 'like', $search)
                    ->orWhere('description', 'like', $search);
            });
        }

        if (isset($filters['min_price'])) {
            $query->where('price', '>=', (float) $filters['min_price']);
        }

        if (isset($filters['max_price'])) {
            $query->where('price', '<=', (float) $filters['max_price']);
        }

        $sortField = $filters['sort_by'] ?? 'created_at';
        $sortDirection = $filters['sort_direction'] ?? 'desc';
        $query->orderBy($sortField, $sortDirection);

        $query->with(['productType', 'tags']);

        $perPage = $filters['per_page'] ?? 12;

        return $query->paginate($perPage);
    }
}
