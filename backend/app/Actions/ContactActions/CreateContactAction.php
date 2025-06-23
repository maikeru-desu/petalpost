<?php

namespace App\Actions\ContactActions;

use App\Models\Contact;
use Illuminate\Support\Facades\DB;

class CreateContactAction
{
    /**
     * Create a new contact message.
     *
     * @param array $data Contact form data
     * @return Contact The newly created contact
     */
    public function execute(array $data): Contact
    {        
        return DB::transaction(function () use ($data) {
            $contact = Contact::create([
                'name' => $data['name'],
                'email' => $data['email'],
                'subject' => $data['subject'],
                'message' => $data['message'],
                'read' => false,
            ]);
            
            // TODO: Send notification to admin
            // Notification::send($admins, new NewContactNotification($contact));
            
            return $contact;
        });
    }
}
