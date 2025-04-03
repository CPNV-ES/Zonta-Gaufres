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
        //TODO: Ecrire dans la documentation la particularité de la clé unique
        Schema::create('addresses', function (Blueprint $table) {
            $table->id();
            $table->string('street', '150');
            $table->string('street_number', '50');
            $table->string('country', '150');
            $table->string('region', '150');
            $table->string('complement')->nullable();
            $table->foreignId('city_id')->constrained();
            $table->timestamps();
            $table->unique(['street', 'street_number', 'country', 'region', 'complement', 'city_id'], 'address_unique');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('addresses');
    }
};
