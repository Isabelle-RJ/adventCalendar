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
        Schema::create('items_cases', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->integer('number');
            $table->string('gift');
            $table->foreignUuid('calendar_id')->constrained('calendars')->cascadeOnDelete();
            $table->boolean('is_opened')->default(false);
            $table->dateTime('opened_at')->nullable();
            $table->string('slug');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('items_cases');
    }
};
