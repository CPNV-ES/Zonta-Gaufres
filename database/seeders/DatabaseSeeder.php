<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Address;
use App\Models\AddressType;
use App\Models\Article;
use App\Models\BillingInformation;
use App\Models\City;
use App\Models\DeliverSchedule;
use App\Models\Order;
use App\Models\People;
use App\Models\PeopleType;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        AddressType::factory(3)->create();
        City::factory(50)->create();
        Address::factory(10)->create();
        Article::factory(1)->create();
        BillingInformation::factory(1)->create();
        DeliverSchedule::factory(20)->create();
        PeopleType::factory(3)->create();
        People::factory(100)->create();
        Order::factory(100)->create();
    }
}
