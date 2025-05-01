<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

use App\Enums\PersonTypesEnum;
use App\Models\PersonType;


return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('person_types', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->timestamps();
        });
        Schema::create('people', function (Blueprint $table) {
            $table->id();
            $table->string('firstname')->nullable();
            $table->string('lastname')->nullable();
            $table->string('email')->nullable();
            $table->string('company')->nullable();
            $table->string('phone_number');
            $table->timestamps();
        });
        Schema::create('person_person_type', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('person_id');
            $table->unsignedBigInteger('person_type_id')->default(4);
            $table->timestamps();
            $table->foreign('person_id')->references('id')->on('people');
            $table->foreign('person_type_id')->references('id')->on('person_types');
            $table->index('person_id', 'IDX_6BD38C8A217BBB47');
            $table->index('person_type_id', 'IDX_6BD38C8AE7D23F1A');
        });
        PersonType::factory(count(PersonTypesEnum::cases()))->create();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('person_person_type');
        Schema::dropIfExists('people');
        Schema::dropIfExists('person_types');
    }
};
