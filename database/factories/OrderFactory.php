<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\Order;
use App\Models\Person;
use App\Models\DeliveryGuySchedule;
use App\Models\PaymentTypes;
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
            'delivery_guy_schedule_id' => DeliveryGuySchedule::all()->random()->id,
            'contact_id' => Person::all()->random()->id,
            'buyer_id' => Person::all()->random()->id,
            'payment_type_id' => PaymentTypes::all()->random()->id,
        ];
    }
}
