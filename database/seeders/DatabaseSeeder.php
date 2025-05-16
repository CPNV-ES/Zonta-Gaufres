<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use Illuminate\Database\Seeder;
use App\Models\Address;
use App\Models\City;
use App\Models\Order;
use App\Models\Person;
use App\Models\PersonType;

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
    }
}
