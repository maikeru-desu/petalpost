<?php

declare(strict_types=1);

namespace App\Actions\ProductTypes;

use App\Models\ProductType;
use Illuminate\Pagination\LengthAwarePaginator;

final class ListProductTypes
{
    /**
     * Execute the action to list all product types with optional filtering.
     *
     * @param  array<string, mixed>  $filters
     */
    public function execute(array $filters = []): LengthAwarePaginator
    {
        $query = ProductType::query();

        if (isset($filters['search'])) {
            $query->where(function ($q) use ($filters) {
                $search = '%'.$filters['search'].'%';
                $q->where('name', 'like', $search);
            });
        }

        $sortField = $filters['sort_by'] ?? 'name';
        $sortDirection = $filters['sort_direction'] ?? 'asc';
        $query->orderBy($sortField, $sortDirection);

        // Optionally load products relationship if requested
        if (isset($filters['include_products']) && $filters['include_products']) {
            $query->with('products');
        }

        $perPage = $filters['per_page'] ?? 20;

        return $query->paginate($perPage);
    }
}
