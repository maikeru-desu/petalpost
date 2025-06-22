<?php

declare(strict_types=1);

namespace App\Actions\Profile;

use App\Models\User;

final class GetProfileAction
{
    /**
     * Get the user profile by user ID
     *
     * @param  int  $userId  The ID of the user
     */
    public function execute(int $userId): User
    {
        return User::findOrFail($userId);
    }
}
