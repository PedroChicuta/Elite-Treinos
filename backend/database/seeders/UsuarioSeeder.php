<?php

namespace Database\Seeders;

use App\Models\Usuario;
use Hash;
use Illuminate\Database\Seeder;

class UsuarioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
            Usuario::create([
                'nome' => 'Admin',
                'email' => 'admin@example.com',
                'senha' => 'password',

            ]);
    }
}
