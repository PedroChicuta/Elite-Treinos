<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Personal extends Model
{
    protected $table = 'tb_personal';

    protected $primaryKey = 'id_personal';

    public const CREATED_AT = 'dth_criacao';
    public const UPDATED_AT = 'dth_atualizacao';

    protected $fillable = [
        'id_usuario',
        'telefone',
        'cref',
    ];

    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'id_usuario', 'id_usuario');
    }

    public function alunos()
    {
        return $this->hasMany(Aluno::class, 'id_personal', 'id_personal');
    }
}
