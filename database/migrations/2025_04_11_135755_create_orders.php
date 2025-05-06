<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

use App\Enums\PaymentTypesEnum;
use App\Enums\InvoiceStatusEnum;
use App\Models\PaymentTypes;
use App\Models\InvoiceStatus;

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

        Schema::create('invoice_statuses', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->timestamps();
        });

        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('delivery_guy_id')->nullable();
            $table->unsignedBigInteger('contact_id')->nullable();
            $table->unsignedBigInteger('buyer_id');
            $table->date('date');
            $table->time('start_delivery_time');
            $table->time('end_delivery_time');
            $table->time('real_delivery_time')->nullable();
            $table->string('remark', 255)->nullable();
            $table->string('gifted_by', 255)->nullable();
            $table->timestamps();
            $table->unsignedBigInteger('payment_type_id');
            $table->integer('waffle_quantity');
            $table->unsignedBigInteger('address_id');
            $table->date('payment_date')->nullable();
            $table->unsignedBigInteger('status_id')->default(2);
            $table->foreign('contact_id')->references('id')->on('people')->onDelete('set null');
            $table->foreign('buyer_id')->references('id')->on('people')->onDelete('cascade');
            $table->foreign('delivery_guy_id')->references('id')->on('people')->onDelete('cascade');
            $table->foreign('payment_type_id')->references('id')->on('payment_types');
            $table->foreign('address_id')->references('id')->on('addresses');
            $table->foreign('status_id')->references('id')->on('invoice_statuses');
            $table->index('buyer_id', 'IDX_E52FFDEE6C755722');
            $table->index('contact_id', 'IDX_E52FFDEEE7A1254A');
        });

        PaymentTypes::factory(count(PaymentTypesEnum::cases()))->create();
        InvoiceStatus::factory(count(InvoiceStatusEnum::cases()))->create();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
        Schema::dropIfExists('invoice_statuses');
        Schema::dropIfExists('payment_types');
    }
};
