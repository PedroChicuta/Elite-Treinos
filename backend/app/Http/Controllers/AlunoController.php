<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAlunoRequest;
use App\Http\Requests\UpdateAlunoRequest;
use App\Models\Aluno;
use App\Models\Usuario;
use DB;
use Hash;

class AlunoController extends Controller
{
    public function index()
    {
        return Aluno::with(['usuario', 'personal'])->get();
    }

    public function store(StoreAlunoRequest $request)
    {
        $data = $request->validated();

        return DB::transaction(function () use ($data) {
            $usuario = Usuario::create([
                'nome'  => $data['nome'],
                'email' => $data['email'],
                'senha' => Hash::make($data['senha']),
            ]);

            $aluno = Aluno::create([
                'id_usuario'      => $usuario->id_usuario,
                'id_personal'     => $data['id_personal'] ?? null,
                'data_nascimento' => $data['data_nascimento'],
                'observacao'      => $data['observacao'] ?? null,
            ]);

            return response()->json($aluno->load(['usuario', 'personal.usuario']), 201);
        });
    }

    public function show(string $id)
    {
        $aluno = Aluno::with(['usuario', 'personal'])->find($id);

        if (!$aluno) {
            return response()->json(['message' => 'Aluno não encontrado'], 404);
        }

        return response()->json($aluno);
    }

    public function update(UpdateAlunoRequest $request, string $id)
    {
        $aluno = Aluno::with('usuario')->find($id);

        if (!$aluno) {
            return response()->json(['message' => 'Aluno não encontrado'], 404);
        }

        DB::transaction(function () use ($request, $aluno) {
            $aluno->update($request->only(['id_personal', 'data_nascimento', 'observacao']));
            $aluno->usuario->update($request->only(['nome', 'email', 'senha']));
        });

        return response()->json($aluno->load(['usuario', 'personal.usuario']));
    }

    public function destroy(string $id)
    {
        $aluno = Aluno::find($id);

        if (!$aluno) {
            return response()->json(['message' => 'Aluno não encontrado'], 404);
        }

        $aluno->delete();

        return response()->json(['message' => 'Aluno excluído com sucesso']);
    }
}