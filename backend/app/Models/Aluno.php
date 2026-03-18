<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Aluno extends Model
{
    protected $table = 'tb_aluno';

    protected $primaryKey = 'id_aluno';

    public const CREATED_AT = 'dth_criacao';
    public const UPDATED_AT = 'dth_atualizacao';

    protected $fillable = [
        'id_usuario',
        'id_personal',
        'data_nascimento',
        'observacao',
    ];

    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'id_usuario', 'id_usuario');
    }

    public function personal()
    {
        return $this->belongsTo(Personal::class, 'id_personal', 'id_personal');
    }

    public function treinos()
    {
        return $this->belongsToMany(Treino::class, 'tb_aluno_treino', 'id_aluno', 'id_treino')
            ->withTimestamps('dth_criacao', 'dth_atualizacao');
    }

    protected function casts(): array
    {
        return [
            'data_nascimento' => 'date',
        ];
    }
}
