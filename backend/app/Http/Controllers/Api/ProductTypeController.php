<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Actions\ProductTypes\CreateProductType;
use App\Actions\ProductTypes\DeleteProductType;
use App\Actions\ProductTypes\GetProductType;
use App\Actions\ProductTypes\ListProductTypes;
use App\Actions\ProductTypes\UpdateProductType;
use App\Http\Controllers\Controller;
use App\Http\Requests\CreateProductTypeRequest;
use App\Http\Requests\UpdateProductTypeRequest;
use App\Models\ProductType;
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
        try {
            $filters = $request->all();
            $productTypes = $action->execute($filters);

            return $this->paginatedResponse($productTypes, 'Product types retrieved successfully');
        } catch (ValidationException $e) {
            return $this->errorResponse('Error fetching product types', $e->status);
        }
    }

    /**
     * Display the specified product type.
     */
    public function show(ProductType $productType, GetProductType $action): JsonResponse
    {
        try {
            $productType = $action->execute($productType);

            return $this->successResponse($productType, 'Product type retrieved successfully');
        } catch (ValidationException $e) {
            return $this->errorResponse('Error fetching product type', $e->status);
        }
    }

    /**
     * Store a newly created product type.
     */
    public function store(CreateProductTypeRequest $request, CreateProductType $action): JsonResponse
    {
        try {
            $productType = $action->execute($request->validated());

            return $this->successResponse($productType, 'Product type created successfully', Response::HTTP_CREATED);
        } catch (ValidationException $e) {
            return $this->errorResponse('Error creating product type', $e->status);
        }
    }

    /**
     * Update the specified product type.
     */
    public function update(UpdateProductTypeRequest $request, string $id, UpdateProductType $action): JsonResponse
    {
        try {
            $productType = $action->execute($id, $request->validated());

            return $this->successResponse($productType, 'Product type updated successfully');
        } catch (ValidationException $e) {
            return $this->errorResponse('Error updating product type', $e->status);
        }
    }

    /**
     * Remove the specified product type.
     */
    public function destroy(ProductType $productType, DeleteProductType $action): JsonResponse
    {
        try {
            $action->execute($productType);

            return $this->successResponse(null, 'Product type deleted successfully', Response::HTTP_NO_CONTENT);
        } catch (ValidationException $e) {
            return $this->errorResponse('Error deleting product type', $e->status);
        }
    }
}
