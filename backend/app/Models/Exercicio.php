<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Exercicio extends Model
{
    protected $table = 'tb_exercicio';

    protected $primaryKey = 'id_exercicio';

    public const CREATED_AT = 'dth_criacao';
    public const UPDATED_AT = 'dth_atualizacao';

    protected $fillable = [
        'nome_exercicio',
    ];

    public function treinos()
    {
        return $this->belongsToMany(Treino::class, 'tb_treino_exercicio', 'id_exercicio', 'id_treino')
            ->withPivot([
                'ordem_exercicio',
                'series',
                'repeticoes_tempo',
                'observacao',
            ])
            ->withTimestamps('dth_criacao', 'dth_atualizacao');
    }
}
