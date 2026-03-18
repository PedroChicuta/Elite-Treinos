<?php

namespace App\Http\Requests;

use App\Models\Personal;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;

class UpdatePersonalRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $id = $this->route('trainer');

         $personal = Personal::with('usuario')->find($id);

        return [
            'nome'     => 'sometimes|string|max:255',
            'email'    => 'sometimes|email|unique:tb_usuario,email,' . $personal->id_usuario . ',id_usuario',
            'senha'    => 'sometimes|string|min:8',
            'telefone' => 'sometimes|string|max:20',
            'cref'     => 'sometimes|string|max:20|unique:tb_personal,cref,' . $personal->id_personal . ',id_personal',
        ];
    }

    public function messages(): array
    {
        return [
            'nome.string'      => 'O campo nome deve ser um texto válido.',
            'nome.max'         => 'O campo nome deve conter no máximo 255 caracteres.',
            'email.email'      => 'O campo email deve ser um endereço de email válido.',
            'email.unique'     => 'O email já está em uso.',
            'senha.string'     => 'O campo senha deve ser um texto válido.',
            'senha.min'        => 'A senha deve conter pelo menos 8 caracteres.',
            'telefone.string'  => 'O campo telefone deve ser um texto válido.',
            'telefone.max'     => 'O campo telefone deve conter no máximo 20 caracteres.',
            'cref.string'      => 'O campo cref deve ser um texto válido.',
            'cref.max'         => 'O campo cref deve conter no máximo 50 caracteres.',
            'cref.unique'      => 'O CREF já está em uso.',
        ];
    }

    protected function failedValidation(Validator $validator): void
    {
        throw new HttpResponseException(
            response()->json(['errors' => $validator->errors()], 422)
        );
    }
}
