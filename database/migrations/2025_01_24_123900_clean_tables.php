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


        Schema::dropIfExists('order_article');
        Schema::dropIfExists('articles');
        Schema::dropIfExists('billing_informations');
        Schema::dropIfExists('addresse_types');
        Schema::dropIfExists('order_address');

        Schema::table('orders', function (Blueprint $table) {
            $table->foreign('payment_type_id')->references(columns: 'id')->on('payment_types');
            $table->integer('waffle_quantity');
            $table->foreignId('addresse_id')->constrained();
            $table->foreign('address_id')->references('id')->on('addresses');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {

        //
    }
};
