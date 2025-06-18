<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Actions\Products\CreateProduct;
use App\Actions\Products\DeleteProduct;
use App\Actions\Products\GetProduct;
use App\Actions\Products\ListProducts;
use App\Actions\Products\UpdateProduct;
use App\Http\Requests\CreateProductRequest;
use App\Http\Requests\UpdateProductRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

final class ProductController extends Controller
{
    /**
     * Display a listing of products.
     */
    public function index(Request $request, ListProducts $action): JsonResponse
    {
        $products = $action->execute($request->all());

        return response()->json($products);
    }

    /**
     * Display the specified product.
     */
    public function show(string $id, GetProduct $action): JsonResponse
    {
        $product = $action->execute($id);

        return response()->json($product);
    }

    /**
     * Store a newly created product.
     */
    public function store(CreateProductRequest $request, CreateProduct $action): JsonResponse
    {
        $product = $action->execute($request->validated());

        return response()->json($product, Response::HTTP_CREATED);
    }

    /**
     * Update the specified product.
     */
    public function update(UpdateProductRequest $request, string $id, UpdateProduct $action): JsonResponse
    {
        $product = $action->execute($id, $request->validated());

        return response()->json($product);
    }

    /**
     * Remove the specified product.
     */
    public function destroy(string $id, DeleteProduct $action): JsonResponse
    {
        $action->execute($id);

        return response()->json(null, Response::HTTP_NO_CONTENT);
    }
}
