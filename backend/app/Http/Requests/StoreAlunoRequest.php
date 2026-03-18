<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreAlunoRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'nome'            => 'required|string|max:255',
            'email'           => 'required|email|unique:tb_usuario,email',
            'senha'           => 'required|string|min:8',
            'id_personal'     => 'nullable|exists:tb_personal,id_personal',
            'data_nascimento' => 'required|date|before:today',
            'observacao'      => 'nullable|string',
        ];
    }

    public function messages(): array
    {
        return [
            'nome.required'            => 'O campo nome é obrigatório.',
            'nome.max'                 => 'O campo nome deve conter no máximo 255 caracteres.',
            'email.required'           => 'O campo email é obrigatório.',
            'email.email'              => 'O campo email deve ser um endereço de email válido.',
            'email.unique'             => 'O email já está em uso.',
            'senha.required'           => 'O campo senha é obrigatório.',
            'senha.min'                => 'A senha deve conter pelo menos 8 caracteres.',
            'id_personal.exists'       => 'O personal informado não existe.',
            'data_nascimento.required' => 'O campo data de nascimento é obrigatório.',
            'data_nascimento.date'     => 'O campo data de nascimento deve ser uma data válida.',
            'data_nascimento.before'   => 'A data de nascimento deve ser anterior à data atual.',
        ];
    }
}