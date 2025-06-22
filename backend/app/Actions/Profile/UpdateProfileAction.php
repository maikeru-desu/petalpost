<?php

declare(strict_types=1);

namespace App\Actions\Profile;

use App\Models\User;
use Illuminate\Support\Facades\DB;

final class UpdateProfileAction
{
    /**
     * Update the user profile
     *
     * @param int $userId The ID of the user
     * @param array $data The validated profile data
     * @return User
     */
    public function execute(int $userId, array $data): User
    {
        $user = User::findOrFail($userId);
        
        return DB::transaction(function () use ($user, $data) {
            $user->update([
                'first_name' => $data['first_name'],
                'last_name' => $data['last_name'],
                'phone' => $data['phone'] ?? null,
                'address' => $data['address'] ?? null,
            ]);
            
            return $user;
        });
    }
}
