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

        Schema::table('orders', function (Blueprint $table) {
            $table->dropForeign('orders_payment_type_id_foreign');
            $table->dropColumn('payment_type_id');
            $table->dropColumn('waffle_quantity');
            $table->dropForeign('orders_address_id_foreign');
            $table->dropColumn('address_id');
        });

        Schema::create('order_article', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained();
            $table->foreignId('article_id')->constrained();
            $table->integer('quantity');
            $table->timestamps();
        });

        Schema::create('articles', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->float('price');
            $table->timestamps();
        });

        Schema::create('billing_informations', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email');
            $table->string('phone');
            $table->timestamps();
        });

        Schema::create('addresse_types', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->timestamps();
        });

        Schema::create('order_address', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained();
            $table->foreignId('address_id')->constrained();
            $table->foreignId('addresse_type_id')->constrained();
            $table->timestamps();
        });
    }
};
