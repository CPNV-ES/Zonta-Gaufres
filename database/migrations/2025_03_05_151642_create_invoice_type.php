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
        Schema::create('invoice_statuses', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->timestamps();
        });
        Schema::table('invoices', function (Blueprint $table) {
            $table->foreignId('status_id')->constrained("invoice_statuses");
            $table->dropColumn('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invoice_statuses');
        Schema::table('invoices', function (Blueprint $table) {
            $table->string('status');
            $table->dropForeign(['invoice_status_id']);
            $table->dropColumn('invoice_status_id');
        });
    }
};
