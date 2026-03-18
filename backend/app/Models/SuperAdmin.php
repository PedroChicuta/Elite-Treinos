<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SuperAdmin extends Model
{
    protected $table = 'tb_super_admin';

    protected $primaryKey = 'id_super_admin';

    public const CREATED_AT = 'dth_criacao';
    public const UPDATED_AT = 'dth_atualizacao';

    protected $fillable = [
        'id_usuario'
    ];

    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'id_usuario', 'id_usuario');
    }
}
