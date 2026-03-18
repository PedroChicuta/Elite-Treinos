<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tb_aluno', function (Blueprint $table) {
            $table->id('id_aluno');
            $table->foreignId('id_usuario')->constrained('tb_usuario', 'id_usuario')->onDelete('cascade');
            $table->foreignId('id_personal')->nullable()->constrained('tb_personal', 'id_personal')->onDelete('set null');
            $table->date('data_nascimento')->nullable();
            $table->text('observacao')->nullable();
            $table->timestamp('dth_criacao')->useCurrent();
            $table->timestamp('dth_atualizacao')->nullable()->useCurrentOnUpdate();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tb_aluno');
    }
};
