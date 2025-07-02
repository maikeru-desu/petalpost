<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Actions\ContactActions\CreateContactAction;
use App\Actions\ContactActions\GetContactsAction;
use App\Actions\ContactActions\MarkContactAsReadAction;
use App\Http\Controllers\Controller;
use App\Http\Requests\CreateContactRequest;
use App\Models\Contact;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

final class ContactController extends Controller
{
    /**
     * Create a new contact message.
     *
     * @param  Request  $request
     */
    public function store(CreateContactRequest $request, CreateContactAction $action): JsonResponse
    {
        try {
            $action->execute($request->validated());

            return $this->successResponse(null, 'Contact message sent successfully', 201);
        } catch (Exception $e) {
            return $this->errorResponse('Failed to send message', 500);
        }
    }

    /**
     * Get all contact messages (admin only).
     */
    public function index(Request $request, GetContactsAction $action): JsonResponse
    {
        try {
            $perPage = $request->input('per_page', 15);
            $unreadOnly = $request->boolean('unread_only', false);

            $contacts = $action->execute($perPage, $unreadOnly);

            return $this->successResponse($contacts, 'Contacts retrieved successfully');
        } catch (Exception $e) {
            return $this->errorResponse('Failed to retrieve contacts');
        }
    }

    /**
     * Mark a contact message as read (admin only).
     */
    public function markAsRead(Contact $contact, MarkContactAsReadAction $action): JsonResponse
    {
        try {
            $contact = $action->execute($contact);

            if (! $contact) {
                return $this->errorResponse('Contact not found', Response::HTTP_NOT_FOUND);
            }

            return $this->successResponse($contact, 'Contact marked as read');
        } catch (Exception $e) {
            return $this->errorResponse('Failed to mark contact as read', Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
