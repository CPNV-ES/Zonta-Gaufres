<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\Order;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<\App\Models\Order>
 */
final class OrderFactory extends Factory
{
    /**
    * The name of the factory's corresponding model.
    *
    * @var string
    */
    protected $model = Order::class;

    /**
    * Define the model's default state.
    *
    * @return array
    */
    public function definition(): array
    {
        $faker = fake();
        return [
            'date' => $faker->date,
            'start_delivery_time' => $faker->time,
            'end_delivery_time' => $faker->time,
            'gifted_by' => $faker->optional->firstName,
            'deliver_at' => $faker->optional->time,
            'contact_id' => \App\Models\People::factory(),
            'buyer_id' => \App\Models\People::factory(),
            // ! Payment type id is not a foreign key
            'payment_type_id' => $faker->randomNumber(1, true),
            'deliver_schedules_id' => \App\Models\DeliverSchedule::factory(),
        ];
    }
}
