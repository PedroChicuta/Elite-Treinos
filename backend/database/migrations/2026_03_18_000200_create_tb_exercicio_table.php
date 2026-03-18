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
        Schema::create('tb_exercicio', function (Blueprint $table) {
            $table->id('id_exercicio');
            $table->string('nome_exercicio', 120);
            $table->timestamp('dth_criacao')->useCurrent();
            $table->timestamp('dth_atualizacao')->nullable()->useCurrentOnUpdate();

            $table->unique('nome_exercicio');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_exercicio');
    }
};
