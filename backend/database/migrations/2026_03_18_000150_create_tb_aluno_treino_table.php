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
        Schema::create('tb_aluno_treino', function (Blueprint $table) {
            $table->id('id_aluno_treino');
            $table->foreignId('id_aluno')->constrained('tb_aluno', 'id_aluno')->onDelete('cascade');
            $table->foreignId('id_treino')->constrained('tb_treino', 'id_treino')->onDelete('cascade');
            $table->timestamp('dth_criacao')->useCurrent();
            $table->timestamp('dth_atualizacao')->nullable()->useCurrentOnUpdate();

            $table->unique(['id_aluno', 'id_treino']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_aluno_treino');
    }
};
