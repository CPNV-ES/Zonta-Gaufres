<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Enums\InvoiceStatusEnum;
use App\Enums\PaymentTypesEnum;
use App\Enums\PersonTypesEnum;
use Illuminate\Database\Seeder;
use App\Models\Address;
use App\Models\City;
use App\Models\DeliveryGuySchedule;
use App\Models\InvoiceStatus;
use App\Models\Order;
use App\Models\PaymentTypes;
use App\Models\Person;
use App\Models\PersonType;
use App\Models\Invoice;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        City::factory(50)->create();
        Address::factory(10)->create();
        Person::factory(100)->create();
        Order::factory(100)->create();

        foreach (Person::all() as $person) {
            $person->personType()->attach(PersonType::all()->random());
        }
    }
}
