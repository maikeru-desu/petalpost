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
     *
     * @param GetProfileAction $action
     * @return JsonResponse
     */
    public function show(GetProfileAction $action): JsonResponse
    {
        $userId = Auth::id();
        $user = $action->execute($userId);
        
        return response()->json($user);
    }

    /**
     * Update the authenticated user's profile
     *
     * @param UpdateProfileRequest $request
     * @param UpdateProfileAction $action
     * @return JsonResponse
     */
    public function update(UpdateProfileRequest $request, UpdateProfileAction $action): JsonResponse
    {
        $userId = Auth::id();
        $user = $action->execute(
            $userId, 
            $request->validated()
        );
        
        return response()->json([
            'message' => 'Profile updated successfully',
            'user' => $user
        ]);
    }
}
