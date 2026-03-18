<?php

namespace Database\Seeders;

use App\Models\Aluno;
use App\Models\Personal;
use App\Models\Usuario;
use Illuminate\Database\Seeder;

class AlunoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $personais = Personal::all();
        
        $alunos = [
            // 1 aluno para o Personal 1
            [
                'id_personal'     => $personais[0]->id_personal,
                'nome'            => 'Aluno Um',
                'email'           => 'aluno1@app.com',
                'data_nascimento' => '1995-03-10',
                'observacao'      => 'Foco em hipertrofia.',
            ],
            // 2 alunos para o Personal 2
            [
                'id_personal'     => $personais[1]->id_personal,
                'nome'            => 'Aluno Dois',
                'email'           => 'aluno2@app.com',
                'data_nascimento' => '1998-07-22',
                'observacao'      => 'Foco em emagrecimento.',
            ],
            [
                'id_personal'     => $personais[1]->id_personal,
                'nome'            => 'Aluno Três',
                'email'           => 'aluno3@app.com',
                'data_nascimento' => '2000-01-15',
                'observacao'      => 'Reabilitação pós-cirurgia.',
            ],
            // 2 alunos para o Personal 3
            [
                'id_personal'     => $personais[2]->id_personal,
                'nome'            => 'Aluno Quatro',
                'email'           => 'aluno4@app.com',
                'data_nascimento' => '1993-11-30',
                'observacao'      => 'Condicionamento físico geral.',
            ],
            [
                'id_personal'     => $personais[2]->id_personal,
                'nome'            => 'Aluno Cinco',
                'email'           => 'aluno5@app.com',
                'data_nascimento' => '1990-05-18',
                'observacao'      => 'Preparação para corrida.',
            ],
        ];

        foreach ($alunos as $dados) {
            $usuario = Usuario::create([
                'nome'  => $dados['nome'],
                'email' => $dados['email'],
                'senha' => 'password',
            ]);

            Aluno::create([
                'id_usuario'      => $usuario->id_usuario,
                'id_personal'     => $dados['id_personal'],
                'data_nascimento' => $dados['data_nascimento'],
                'observacao'      => $dados['observacao'],
            ]);
        }
    }
}
