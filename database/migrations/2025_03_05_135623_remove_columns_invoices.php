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
        Schema::table('invoices', function (Blueprint $table) {
            $table->dropColumn('contact');
            $table->dropColumn('company');
            $table->dropColumn('client');
            $table->foreignId('order_id')->constrained();
            $table->foreignId('client_id')->constrained('people');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('invoices', function (Blueprint $table) {
            $table->string('contact');
            $table->string('company');
            $table->string('client');
            $table->dropForeign(['order_id']);
            $table->dropForeign(['client_id']);
            $table->dropColumn('order_id');
            $table->dropColumn('client_id');
        });
    }
};
