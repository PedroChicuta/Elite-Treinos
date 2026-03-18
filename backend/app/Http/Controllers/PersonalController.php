<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePersonalRequest;
use App\Http\Requests\UpdatePersonalRequest;
use App\Models\Personal;
use App\Models\Usuario;
use DB;
use Hash;

class PersonalController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Personal::with('usuario')->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePersonalRequest $request)
    {
        $data = $request->validated();

        return DB::transaction(function () use ($data) {
            $user = Usuario::create([
                'nome' => $data['nome'],
                'email' => $data['email'],
                'senha' => Hash::make($data['senha']),
            ]);

            $personal = Personal::create([
                'id_usuario' => $user->id_usuario,
                'telefone' => $data['telefone'],
                'cref' => $data['cref'] ?? null,
            ]);
            
            return response()->json($personal, 201);
        });
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $personal = Personal::with('usuario')->find($id);

        if (!$personal) {
            return response()->json(['message' => 'Personal não encontrado'], 404);
        }

        return response()->json($personal);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePersonalRequest $request, string $id)
    {
        $personal = Personal::with('usuario')->find($id);

        if (!$personal) {
            return response()->json(['message' => 'Personal não encontrado'], 404);
        }

        DB::transaction(function () use ($request, $personal) {
            $personal->update($request->only(['telefone', 'cref']));
            $personal->usuario->update($request->only(['nome', 'email', 'senha']));
        });

        return response()->json($personal->load('usuario'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $personal = Personal::find($id);

        if (!$personal) {
            return response()->json(['message' => 'Personal não encontrado'], 404);
        }

        $personal->delete();

        return response()->json(['message' => 'Personal excluído com sucesso']);
    }
}
