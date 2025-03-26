<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->date('payment_date')->nullable();
            $table->unsignedBigInteger('status_id')->default(2);
            $table->foreign('status_id')->references('id')->on('invoice_statuses');
        });

        DB::table('invoices')->orderBy('id')->chunk(100, function ($invoices) {
            foreach ($invoices as $invoice) {
                DB::table('orders')
                    ->where('id', $invoice->order_id)
                    ->update(['payment_date' => $invoice->payment_date, 'status_id' => $invoice->status_id]);
            }
        });

        Schema::dropIfExists('invoices');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::create('invoices', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('order_id');
            $table->unsignedBigInteger('client_id');
            $table->decimal('total', 8, 2);
            $table->date('payment_date');
            $table->unsignedBigInteger('status_id');
            $table->foreign('order_id')->references('id')->on('orders');
            $table->foreign('status_id')->references('id')->on('invoice_statuses');
            $table->foreign('client_id')->references('id')->on('people');
            $table->timestamps();
            $table->date('creation_date')->default(DB::raw('CURRENT_TIMESTAMP'));
        });

        DB::table('orders')->orderBy('id')->chunk(100, function ($orders) {
            foreach ($orders as $order) {
                DB::table('invoices')
                    ->updateOrInsert(['order_id' => $order->id, 'total' => $order->total, 'payment_date' => $order->payment_date, 'status_id' => $order->status_id]);
            }
        });

        Schema::table('orders', function (Blueprint $table) {
            $table->dropColumn('total');
            $table->dropColumn('payment_date');
            $table->dropForeign(['status_id']);
            $table->dropColumn('status_id');
        });
    }
};
