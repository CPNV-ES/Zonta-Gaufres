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
        });

        Schema::table('invoices', function (Blueprint $table) {
            $table->dropColumn('company');
        });

        Schema::table('invoices', function (Blueprint $table) {
            $table->dropColumn('client');
        });

        Schema::table('invoices', function (Blueprint $table) {
            $table->foreignId('order_id')->constrained();
        });

        Schema::table('invoices', function (Blueprint $table) {
            $table->foreignId('client_id')->constrained('people');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('invoices', function (Blueprint $table) {
            $table->dropForeign(['order_id']);
            $table->dropForeign(['client_id']);
        });

        Schema::table('invoices', function (Blueprint $table) {
            $table->dropColumn(['order_id', 'client_id']);
        });

        Schema::table('invoices', function (Blueprint $table) {
            $table->string('contact');
        });

        Schema::table('invoices', function (Blueprint $table) {
            $table->string('company');
        });

        Schema::table('invoices', function (Blueprint $table) {
            $table->string('client');
        });
    }
};
