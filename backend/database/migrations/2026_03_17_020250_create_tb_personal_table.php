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
        Schema::create('tb_personal', function (Blueprint $table) {
            $table->id('id_personal');
            $table->foreignId('id_usuario')->constrained('tb_usuario', 'id_usuario')->onDelete('cascade');
            $table->string('telefone', 20);
            $table->string('cref', 20)->nullable()->unique();
            $table->timestamp('dth_criacao')->useCurrent();
            $table->timestamp('dth_atualizacao')->nullable()->useCurrentOnUpdate();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_personal');
    }
};