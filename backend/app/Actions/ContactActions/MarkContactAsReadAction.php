<?php

declare(strict_types=1);

namespace App\Actions\ContactActions;

use App\Models\Contact;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

final class MarkContactAsReadAction
{
    /**
     * Mark a contact message as read.
     *
     * @param  int  $contactId  ID of the contact to mark as read
     * @return Contact|null The updated contact or null if not found
     */
    public function execute(int $contactId): ?Contact
    {
        $contact = Contact::findOrFail($contactId);

        if (! $contact) {
            return null;
        }

        return DB::transaction(function () use ($contact) {
            $contact->update([
                'read' => true,
                'read_at' => Carbon::now(),
            ]);

            return $contact->fresh();
        });
    }
}
