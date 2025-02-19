<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    protected $connection = 'mongodb';

    public function up(): void
    {
        Schema::create('profile_data', static function (Blueprint $collection) {
            $collection->index('user_id');
            $collection->integer('nb_calendars')->default(0);
            $collection->integer('nb_shared_calendars')->default(0);
            $collection->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('profile_data');
    }
};
