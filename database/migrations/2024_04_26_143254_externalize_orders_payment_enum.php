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
        Schema::create('payment_types', function (Blueprint $table) {
            $table->id();
            $table->string('name');
        });

        Schema::table('orders', function (Blueprint $table) {
            $table->dropColumn('payment');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->enum('payment', ['Livraison', 'Facture', 'En amont']);
            $table->dropColumn('payment_type_id');
        });

        Schema::dropIfExists('payment_types');
    }
};
