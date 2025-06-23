<?php

namespace App\Actions\ContactActions;

use App\Models\Contact;
use Illuminate\Pagination\LengthAwarePaginator;

class GetContactsAction
{
    /**
     * Get paginated list of contacts.
     *
     * @param int $perPage Number of items per page
     * @param bool $unreadOnly Filter to only unread messages
     * @return LengthAwarePaginator Paginated contacts
     */
    public function execute(int $perPage = 15, bool $unreadOnly = false): LengthAwarePaginator
    {
        $query = Contact::query()->orderBy('created_at', 'desc');
        
        if ($unreadOnly) {
            $query->where('read', false);
        }
        
        return $query->paginate($perPage);
    }
}
