<?php

use App\Http\Controllers\AlunoController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PersonalController;
use App\Http\Controllers\ShowAlunosPersonalController;
use App\Http\Controllers\TreinoController;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'login']);

Route::group(['middleware' => 'auth:sanctum'], function () {

    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('/me', [AuthController::class, 'me']);

    Route::apiResource('trainers', PersonalController::class);

     Route::apiResource('alunos', AlunoController::class);

    Route::get('/treinos', [TreinoController::class, 'index']);

    Route::get('/alunos/{id_aluno}/treinos', [TreinoController::class, 'treinosPorAluno']);
    Route::post('/alunos/{id_aluno}/treinos/{id_treino}', [TreinoController::class, 'storePorAluno']);
    Route::delete('/alunos/{id_aluno}/treinos/{id_treino}', [TreinoController::class, 'destroyPorAluno']);

    Route::get('trainers/{id}/alunos', ShowAlunosPersonalController::class);
});
