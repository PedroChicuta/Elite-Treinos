<?php

namespace App\Http\Controllers;

use App\Models\Personal;

class ShowAlunosPersonalController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(string $id)
    {
        $personal = Personal::find($id);

        if (!$personal) {
            return response()->json(['message' => 'Personal não encontrado'], 404);
        }

        $alunos = $personal->alunos()
            ->with(['usuario', 'personal.usuario'])
            ->get();

        return response()->json($alunos);
    }
}
