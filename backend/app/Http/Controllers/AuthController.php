<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Models\Aluno;
use App\Models\Personal;
use App\Models\SuperAdmin;
use Auth;
use Illuminate\Http\Request;


class AuthController extends Controller{
    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();

        if (!Auth::attempt([
            'email'    => $credentials['email'],
            'password' => $credentials['senha'],
        ])) {
            return response()->json([
                'message' => 'Credenciais inválidas'
            ], 401);
        }

        $user = Auth::user();
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json(['user' => $user])
        ->cookie(
            'access_token',
            $token,
            60 * 10,
            '/',
            null,
            false,
            true,
            false,
            'Strict'
        );
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logout realizado com sucesso'
        ])->cookie(
            'access_token',
            '',
            -1,
            '/',
            null,
            false,
            true,
            false,
            'Strict'
        );
    }

    public function me(Request $request)
    {
        $user = $request->user();

        $aluno = Aluno::where('id_usuario', $user->id_usuario)->first();
        $personal = Personal::where('id_usuario', $user->id_usuario)->first();
        $superAdmin = SuperAdmin::where('id_usuario', $user->id_usuario)->first();

        $isSuperAdmin = (bool) $superAdmin;
        $isPersonal = (bool) $personal;
        $isAluno = (bool) $aluno;

        $tipoUsuario = $isSuperAdmin
            ? 'super_admin'
            : ($isPersonal
                ? 'personal'
                : ($isAluno ? 'aluno' : null));

        return response()->json([
            'id_usuario' => $user->id_usuario,
            'id_aluno' => $aluno?->id_aluno,
            'id_personal' => $personal?->id_personal,
            'id_super_admin' => $superAdmin?->id_super_admin,
            'nome' => $user->nome,
            'email' => $user->email,
            'tipo_usuario' => $tipoUsuario,
            'is_super_admin' => $isSuperAdmin,
            'is_personal' => $isPersonal,
            'is_aluno' => $isAluno,
        ]);
    }
}