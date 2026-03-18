<?php

namespace App\Http\Requests;

use App\Models\Aluno;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class UpdateAlunoRequest extends FormRequest
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
        $id    = $this->route('aluno');
        $aluno = Aluno::with('usuario')->find($id);

        return [
            'nome'            => 'sometimes|string|max:255',
            'email'           => 'sometimes|email|unique:tb_usuario,email,' . $aluno->id_usuario . ',id_usuario',
            'senha'           => 'sometimes|string|min:8',
            'id_personal'     => 'sometimes|nullable|exists:tb_personal,id_personal',
            'data_nascimento' => 'sometimes|date|before:today',
            'observacao'      => 'sometimes|nullable|string',
        ];
    }

    public function messages(): array
    {
        return [
            'nome.string'              => 'O campo nome deve ser um texto válido.',
            'nome.max'                 => 'O campo nome deve conter no máximo 255 caracteres.',
            'email.email'              => 'O campo email deve ser um endereço de email válido.',
            'email.unique'             => 'O email já está em uso.',
            'senha.string'             => 'O campo senha deve ser um texto válido.',
            'senha.min'                => 'A senha deve conter pelo menos 8 caracteres.',
            'id_personal.exists'       => 'O personal informado não existe.',
            'data_nascimento.date'     => 'O campo data de nascimento deve ser uma data válida.',
            'data_nascimento.before'   => 'A data de nascimento deve ser anterior à data atual.',
        ];
    }

    protected function failedValidation(Validator $validator): void
    {
        throw new HttpResponseException(
            response()->json(['errors' => $validator->errors()], 422)
        );
    }
}