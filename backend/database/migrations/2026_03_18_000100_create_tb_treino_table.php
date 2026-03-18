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
        Schema::create('tb_treino', function (Blueprint $table) {
            $table->id('id_treino');
            $table->enum('codigo_treino', ['A', 'B', 'C', 'D']);
            $table->string('nome_treino', 120);
            $table->text('objetivo');
            $table->timestamp('dth_criacao')->useCurrent();
            $table->timestamp('dth_atualizacao')->nullable()->useCurrentOnUpdate();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_treino');
    }
};
