<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Actions\ProductTypes\CreateProductType;
use App\Actions\ProductTypes\DeleteProductType;
use App\Actions\ProductTypes\GetProductType;
use App\Actions\ProductTypes\ListProductTypes;
use App\Actions\ProductTypes\UpdateProductType;
use App\Http\Requests\CreateProductTypeRequest;
use App\Http\Requests\UpdateProductTypeRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;

final class ProductTypeController extends Controller
{
    /**
     * Display a listing of the product types.
     */
    public function index(Request $request, ListProductTypes $action): JsonResponse
    {
        $filters = $request->all();
        $productTypes = $action->execute($filters);

        return response()->json($productTypes);
    }

    /**
     * Display the specified product type.
     */
    public function show(string $id, GetProductType $action): JsonResponse
    {
        $productType = $action->execute($id);

        return response()->json($productType);
    }

    /**
     * Store a newly created product type.
     */
    public function store(CreateProductTypeRequest $request, CreateProductType $action): JsonResponse
    {
        $productType = $action->execute($request->validated());

        return response()->json($productType, Response::HTTP_CREATED);
    }

    /**
     * Update the specified product type.
     */
    public function update(UpdateProductTypeRequest $request, string $id, UpdateProductType $action): JsonResponse
    {
        $productType = $action->execute($id, $request->validated());

        return response()->json($productType);
    }

    /**
     * Remove the specified product type.
     */
    public function destroy(string $id, DeleteProductType $action): JsonResponse
    {
        try {
            $action->execute($id);

            return response()->json(null, Response::HTTP_NO_CONTENT);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => $e->getMessage(),
                'errors' => $e->errors(),
            ], $e->status);
        }
    }
}
