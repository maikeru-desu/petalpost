<?php

declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

final class CreateOrderRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; // Authorization handled by middleware
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'items' => ['required', 'array', 'min:1'],
            'items.*.product_id' => ['required', 'integer', 'exists:products,id'],
            'items.*.quantity' => ['required', 'integer', 'min:1'],
            'billing_address' => ['required', 'string', 'max:1000'],
            'shipping_address' => ['required', 'string', 'max:1000'],
        ];
    }
    
    /**
     * Get custom messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'items.required' => 'Your cart is empty. Please add items to your cart before checking out.',
            'items.min' => 'Your cart is empty. Please add items to your cart before checking out.',
            'items.*.product_id.required' => 'Invalid product selection.',
            'items.*.product_id.exists' => 'One or more selected products are no longer available.',
            'items.*.quantity.required' => 'Please specify a quantity for each product.',
            'items.*.quantity.min' => 'Quantity must be at least 1 for each product.',
            'billing_address.required' => 'Please provide your billing address.',
            'shipping_address.required' => 'Please provide your shipping address.',
        ];
    }
}
