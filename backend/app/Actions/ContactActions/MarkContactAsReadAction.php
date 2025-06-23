<?php

namespace App\Actions\ContactActions;

use App\Models\Contact;
use Illuminate\Support\Carbon;

class MarkContactAsReadAction
{
    /**
     * Mark a contact message as read.
     *
     * @param int $contactId ID of the contact to mark as read
     * @return Contact|null The updated contact or null if not found
     */
    public function execute(int $contactId): ?Contact
    {
        $contact = Contact::findOrFail($contactId);
        
        if (!$contact) {
            return null;
        }
        
        $contact->update([
            'read' => true,
            'read_at' => Carbon::now(),
        ]);
        
        return $contact->fresh();
    }
}
