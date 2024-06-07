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
        Schema::create('invoices', function (Blueprint $table) {
            $table->id();
            $table->string('company');
            $table->string('client');
            $table->date('creation_date');
            $table->date('payment_date');
            $table->string('contact');
            $table->integer('total');
            $table->enum('status', ['Payée', 'En cours', 'Annulée', 'Ouverte']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invoices');
    }
};
