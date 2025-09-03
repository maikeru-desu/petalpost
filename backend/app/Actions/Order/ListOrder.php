<?php

declare(strict_types=1);

namespace App\Actions\Order;

use App\Models\Order;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Auth;

final class ListOrder
{
    public function execute(array $filter = []): LengthAwarePaginator
    {
        $userId = Auth::id();
        $perPage = $filter['per_page'] ?? 10;

        $orders = Order::where('user_id', $userId)
            ->orderBy('created_at', 'desc')
            ->with('items.product')
            ->paginate($perPage);

        return $orders;
    }
}
