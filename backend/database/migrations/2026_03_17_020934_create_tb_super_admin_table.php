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
        Schema::create('tb_super_admin', function (Blueprint $table) {
            $table->id('id_super_admin');
            $table->foreignId('id_usuario')->constrained('tb_usuario', 'id_usuario')->onDelete('cascade');
            $table->timestamp('dth_criacao')->useCurrent();
            $table->timestamp('dth_atualizacao')->nullable()->useCurrentOnUpdate();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tb_super_admin');
    }
};
