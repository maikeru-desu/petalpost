<?php

namespace App\Traits;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Pagination\LengthAwarePaginator;

trait ApiResponseTrait
{
    /**
     * Send a success response.
     *
     * @param mixed $data The data to be returned
     * @param string $message The success message
     * @param int $statusCode The HTTP status code
     * @return \Illuminate\Http\JsonResponse
     */
    protected function successResponse($data = null, $message = 'Success', int $statusCode = Response::HTTP_OK): JsonResponse
    {
        return response()->json([
            'status' => 'success',
            'message' => $message,
            'data' => $data,
        ], $statusCode);
    }

    /**
     * Send an error response.
     *
     * @param string $message The error message
     * @param int $statusCode The HTTP status code
     * @return \Illuminate\Http\JsonResponse
     */
    protected function errorResponse($message = 'Error', int $statusCode = Response::HTTP_INTERNAL_SERVER_ERROR): JsonResponse
    {
        return response()->json([
            'status' => 'error',
            'message' => $message,
        ], $statusCode);
    }

     /**
     * Custom response with meta data
     * 
     * @param mixed $data The data to be returned
     * @param array $meta The meta data
     * @param string $message The success message
     * @param int $statusCode The HTTP status code
     * @return \Illuminate\Http\JsonResponse
     */
    protected function responseWithMeta($data, array $meta, string $message = 'Success', int $statusCode = Response::HTTP_OK): JsonResponse
    {
        return response()->json([
            'status' => 'success',
            'message' => $message,
            'data' => $data,
            'meta' => $meta,
        ], $statusCode);
    }

    /**
     * Paginated response
     * 
     * @param \Illuminate\Pagination\LengthAwarePaginator $paginator The paginator instance
     * @param string $message The success message
     * @return \Illuminate\Http\JsonResponse
     */
    protected function paginatedResponse(LengthAwarePaginator $paginator, string $message = 'Data retrieved successfully'): JsonResponse
    {
        return response()->json([
            'status' => 'success',
            'message' => $message,
            'data' => $paginator->items(),
            'pagination' => [
                'current_page' => $paginator->currentPage(),
                'last_page' => $paginator->lastPage(),
                'per_page' => $paginator->perPage(),
                'total' => $paginator->total(),
                'from' => $paginator->firstItem(),
                'to' => $paginator->lastItem(),
                'has_more_pages' => $paginator->hasMorePages(),
            ],
        ]);
    }
}
