<?php

namespace App\Http\Controllers;

use App\Models\Aluno;
use App\Models\Treino;
use Gate;

class TreinoController extends Controller
{
    public function index()
    {
        $treinos = Treino::with('exercicios')->get();

        return response()->json($treinos);
    }

    public function treinosPorAluno(string $id_aluno)
    {
        $aluno = Aluno::find($id_aluno);

        if (!$aluno) {
            return response()->json(['message' => 'Aluno não encontrado'], 404);
        }

        $treinos = $aluno->treinos()->with('exercicios')->get();

        return response()->json($treinos);
    }

    public function storePorAluno(string $id_aluno, string $id_treino)
    {
        $aluno = Aluno::find($id_aluno);
        
        if (Gate::denies('is-personal')) {
            abort(403, 'Ação não autorizada');
        }

        if (!$aluno) {
            return response()->json(['message' => 'Aluno não encontrado'], 404);
        }

        $treino = Treino::find($id_treino);

        if (!$treino) {
            return response()->json(['message' => 'Treino não encontrado'], 404);
        }

        $treinos = $aluno->treinos();
        $vinculoExiste = $treinos->where('tb_treino.id_treino', $id_treino)->exists();

        if ($vinculoExiste) {
            return response()->json([
                'message' => 'Treino já está vinculado a este aluno',
            ]);
        }

        if($treinos->count() >= 2) {
            return response()->json([
                'message' => 'O aluno já possui o número máximo de treinos vinculados (2)',
            ], 400);
        }

        $aluno->treinos()->attach($treino->id_treino);

        $treino->load('exercicios');

        return response()->json($treino, 201);
    }

    public function destroyPorAluno(string $id_aluno, string $id_treino)
    {
        $aluno = Aluno::find($id_aluno);

        if (Gate::denies('is-personal')) {
            abort(403, 'Ação não autorizada');
        }

        if (!$aluno) {
            return response()->json(['message' => 'Aluno não encontrado'], 404);
        }

        $treino = Treino::find($id_treino);

        if (!$treino) {
            return response()->json(['message' => 'Treino não encontrado'], 404);
        }

        $vinculoExiste = $aluno->treinos()->where('tb_treino.id_treino', $id_treino)->exists();

        if (!$vinculoExiste) {
            return response()->json([
                'message' => 'Treino não está vinculado a este aluno',
            ], 404);
        }

        $aluno->treinos()->detach($treino->id_treino);

        return response()->json([
            'message' => 'Treino desvinculado do aluno com sucesso',
        ]);
    }
}
