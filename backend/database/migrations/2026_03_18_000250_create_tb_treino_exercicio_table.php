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
        Schema::create('tb_treino_exercicio', function (Blueprint $table) {
            $table->id('id_treino_exercicio');
            $table->foreignId('id_treino')->constrained('tb_treino', 'id_treino')->onDelete('cascade');
            $table->foreignId('id_exercicio')->constrained('tb_exercicio', 'id_exercicio')->onDelete('cascade');
            $table->unsignedSmallInteger('ordem_exercicio');
            $table->string('series', 30);
            $table->string('repeticoes_tempo', 50);
            $table->text('observacao')->nullable();
            $table->timestamp('dth_criacao')->useCurrent();
            $table->timestamp('dth_atualizacao')->nullable()->useCurrentOnUpdate();

            $table->unique(['id_treino', 'id_exercicio']);
            $table->unique(['id_treino', 'ordem_exercicio']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_treino_exercicio');
    }
};
