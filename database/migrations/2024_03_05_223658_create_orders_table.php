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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->date('date');
            $table->time('start_delivery_time');
            $table->time('end_delivery_time');
            $table->time('real_delivery_time')->nullable();
            $table->string('remark')->nullable();
            $table->enum('payment', ['Livraison', 'Facture', 'En amont']);
            $table->string('gifted_by')->nullable();
            $table->foreignId('delivery_guy_schedule_id')->nullable()->constrained();
            $table->foreignId('contact_id')->nullable()->constrained('people');
            $table->foreignId('buyer_id')->constrained('people');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ordres');
    }
};
