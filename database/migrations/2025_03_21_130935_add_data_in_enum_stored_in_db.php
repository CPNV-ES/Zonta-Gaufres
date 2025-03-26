<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Enums\PersonTypesEnum;
use App\Enums\PaymentTypesEnum;
use App\Enums\InvoiceStatusEnum;
use App\Models\PersonType;
use App\Models\PaymentTypes;
use App\Models\InvoiceStatus;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('db', function (Blueprint $table) {
            PersonType::factory(count(PersonTypesEnum::cases()))->create();
            PaymentTypes::factory(count(PaymentTypesEnum::cases()))->create();
            InvoiceStatus::factory(count(InvoiceStatusEnum::cases()))->create();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('db', function (Blueprint $table) {
            PersonType::query()->delete();
            PaymentTypes::query()->delete();
            InvoiceStatus::query()->delete();
        });
    }
};
