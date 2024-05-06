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
        //TODO: rename the table (remove "s") to match plurial
        Schema::create('billing_informations', function (Blueprint $table) {
            $table->id();
            $table->string('IBAN');
            $table->foreignId('people_id')->constrained();
            $table->timestamps();
            $table->unique('IBAN');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('billing_informations');
    }
};
