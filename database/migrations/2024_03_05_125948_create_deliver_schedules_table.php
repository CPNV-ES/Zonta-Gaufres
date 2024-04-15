<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {

        Schema::create('deliver_schedules', function (Blueprint $table) {
            $table->id();
            $table->time('start_delivery_time_window');
            $table->time('end_delivery_time_window');
            $table->foreignId('person_id')->constrained();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('deliver_schedules');
    }
};
