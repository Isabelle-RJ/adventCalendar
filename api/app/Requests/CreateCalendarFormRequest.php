<?php

namespace App\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class CreateCalendarFormRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => 'required|string|unique:calendars',
            'image' => 'required|string',
            'items_case' => 'required|array',
            'items_case.*.number' => 'required|integer',
            'items_case.*.gift' => 'required|string',
        ];
    }


    protected function failedValidation(Validator $validator): void
    {
        $errors = $validator->errors()->toArray();
        $formattedErrors = [];

        foreach ($errors as $field => $messages) {
            // Reformat names of fields
            $formattedField = str_replace(['items_case.', '.gift', '.number'], ['Case ', ' (cadeau)', ' (numéro)'], $field);

            // Build error message
            $formattedErrors[] = "{$formattedField} : " . implode(' ', $messages);
        }
        throw new HttpResponseException(response()->json([
            'error' => $formattedErrors,
        ], 422));
    }
}
