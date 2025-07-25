<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Actions\Profile\GetProfileAction;
use App\Actions\Profile\UpdateProfileAction;
use App\Http\Controllers\Controller;
use App\Http\Requests\Profile\UpdateProfileRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

final class ProfileController extends Controller
{
    /**
     * Get the authenticated user's profile
     */
    public function show(GetProfileAction $action): JsonResponse
    {
        $userId = Auth::id();
        $user = $action->execute($userId);

        return $this->successResponse($user, 'Profile retrieved successfully');
    }

    /**
     * Update the authenticated user's profile
     */
    public function update(UpdateProfileRequest $request, UpdateProfileAction $action): JsonResponse
    {
        $userId = Auth::id();
        $user = $action->execute(
            $userId,
            $request->validated()
        );

        return $this->successResponse($user, 'Profile updated successfully');
    }
}
