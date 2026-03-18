<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Treino extends Model
{
    protected $table = 'tb_treino';

    protected $primaryKey = 'id_treino';

    public const CREATED_AT = 'dth_criacao';
    public const UPDATED_AT = 'dth_atualizacao';

    protected $fillable = [
        'codigo_treino',
        'nome_treino',
        'objetivo',
    ];

    public function alunos()
    {
        return $this->belongsToMany(Aluno::class, 'tb_aluno_treino', 'id_treino', 'id_aluno')
            ->withTimestamps('dth_criacao', 'dth_atualizacao');
    }

    public function exercicios()
    {
        return $this->belongsToMany(Exercicio::class, 'tb_treino_exercicio', 'id_treino', 'id_exercicio')
            ->withPivot([
                'ordem_exercicio',
                'series',
                'repeticoes_tempo',
                'observacao',
            ])
            ->withTimestamps('dth_criacao', 'dth_atualizacao')
            ->orderByPivot('ordem_exercicio');
    }
}
