<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Usuario extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */

    protected $table = 'tb_usuario';

    protected $primaryKey = 'id_usuario';

    public const CREATED_AT = 'dth_criacao';

    public const UPDATED_AT = 'dth_atualizacao';

    protected $fillable = [
        'nome',
        'email',
        'senha',
    ];

    public function getAuthPassword()
    {
        return $this->senha;
    }

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'senha',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'senha' => 'hashed',
        ];
    }
}
