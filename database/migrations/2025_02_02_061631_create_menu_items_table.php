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
        Schema::create('menu_items', function (Blueprint $table) {
            $table->id();
            $table->string('image_prod');
            $table->string('name_prod')->unique();
            $table->string('harga_prod');
            $table->text('desk_prod');
            $table->foreignId('category_id');
            $table->timestamps();
        });

        Schema::rename('menu_items', 'products');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('menu_items');
        Schema::rename('menu_items', 'products');
    }
};
