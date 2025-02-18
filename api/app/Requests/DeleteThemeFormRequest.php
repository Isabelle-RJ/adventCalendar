<?php

namespace App\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class DeleteThemeFormRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'slug' => 'required|string',
        ];
    }


    protected function failedValidation(Validator $validator): void
    {
        throw new HttpResponseException(response()->json(['error' => $validator->errors()], 422));
    }}
