<?php

namespace Database\Seeders;

use App\Models\SuperAdmin;
use App\Models\Usuario;
use Illuminate\Database\Seeder;

class SuperAdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $usuario1 = Usuario::create([
            'nome'  => 'Super Admin',
            'email' => 'superadmin@app.com',
            'senha' => 'password',
        ]);

        SuperAdmin::create([
            'id_usuario' => $usuario1->id_usuario,
        ]);
    }
}
