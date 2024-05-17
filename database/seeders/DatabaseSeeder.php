<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Address;
use App\Models\AddressType;
use App\Models\Article;
use App\Models\BillingInformation;
use App\Models\City;
use App\Models\DeliverySchedule;
use App\Models\Order;
use App\Models\PaymentTypes;
use App\Models\Person;
use App\Models\PersonType;

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
        DeliverySchedule::factory(20)->create();
        PersonType::factory(3)->create();
        PaymentTypes::factory(3)->create();
        Person::factory(100)->create();
        Order::factory(100)->create();
        
        foreach (DeliverySchedule::all() as $deliverySchedule) {
            $deliverySchedule->city()->attach(City::all()->random());
        }

        foreach (Order::all() as $order) {
            $order->address()->attach(Address::all()->random(), ['address_type_id' => AddressType::all()->random()->id]);
            $order->articles()->attach(Article::all()->random(), ['quantity' => rand(1, 20)]);
        }

        foreach (Person::all() as $person) {
            $person->personType()->attach(PersonType::all()->random());
        }

    }
}
