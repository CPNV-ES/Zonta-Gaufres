<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\Order;
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
        return [
            'date' => fake()->date(),
            'start_delivery_time' => fake()->time(),
            'end_delivery_time' => fake()->time(),
            'real_delivery_time' => fake()->optional()->time(),
            'remark' => fake()->optional()->sentence(),
            'gifted_by' => fake()->optional()->firstName(),
            'delivery_schedule_id' => \App\Models\DeliverySchedule::factory(),
            'contact_id' => \App\Models\Person::factory(),
            'buyer_id' => \App\Models\Person::factory(),
            'payment_type_id' => fake()->numberBetween(1, 3),
        ];
    }
}
