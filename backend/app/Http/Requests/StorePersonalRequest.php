<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StorePersonalRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'nome' => 'required|string|max:255',
            'email' => 'required|email|unique:tb_usuario,email',
            'senha' => 'required|string|min:8',
            'telefone' => 'required|string|max:20',
            'cref' => 'nullable|string|max:50',
        ];
    }

    public function messages(): array
    {
        return [
            'nome.required' => 'O campo nome é obrigatório.',
            'email.required' => 'O campo email é obrigatório.',
            'email.email' => 'O campo email deve ser um endereço de email válido.',
            'email.unique' => 'O email já está em uso.',
            'senha.required' => 'O campo senha é obrigatório.',
            'senha.min' => 'A senha deve conter pelo menos 8 caracteres.',
            'telefone.required' => 'O campo telefone é obrigatório.',
            'telefone.max' => 'O campo telefone deve conter no máximo 20 caracteres.',
            'cref.max' => 'O campo cref deve conter no máximo 50 caracteres.',
        ];
    }
}
