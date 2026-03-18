<?php

namespace Database\Seeders;

use App\Models\Personal;
use App\Models\Usuario;
use Illuminate\Database\Seeder;

class PersonalSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $personais = [
            [
                'nome'     => 'Personal Um',
                'email'    => 'personal1@app.com',
                'telefone' => '(11) 91111-1111',
                'cref'     => '001234-G/SP',
            ],
            [
                'nome'     => 'Personal Dois',
                'email'    => 'personal2@app.com',
                'telefone' => '(11) 92222-2222',
                'cref'     => '002345-G/SP',
            ],
            [
                'nome'     => 'Personal Três',
                'email'    => 'personal3@app.com',
                'telefone' => '(11) 93333-3333',
                'cref'     => '003456-G/SP',
            ],
        ];

        foreach ($personais as $dados) {
            $usuario = Usuario::create([
                'nome'  => $dados['nome'],
                'email' => $dados['email'],
                'senha' => 'password',
            ]);

            Personal::create([
                'id_usuario' => $usuario->id_usuario,
                'telefone'   => $dados['telefone'],
                'cref'       => $dados['cref'],
            ]);
        }
    }
}
