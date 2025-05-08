<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Enums\PersonTypesEnum;
use App\Models\Order;
use App\Models\Person;
use App\Models\DeliveryGuySchedule;
use App\Models\PaymentTypes;
use App\Models\Address;
use App\Models\PersonType;
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
            'real_delivery_time' => fake()->time(),
            'remark' => fake()->optional()->sentence(),
            'gifted_by' => fake()->optional()->firstName(),
            'contact_id' => Person::hasType(PersonTypesEnum::STAFF)->get()->random()->id,
            'buyer_id' => Person::hasType(PersonTypesEnum::CLIENT)->get()->random()->id,
            'delivery_guy_id' => Person::hasType(PersonTypesEnum::DELIVERY_GUY)->get()->random()->id,
            'payment_type_id' => PaymentTypes::all()->random()->id,
            'waffle_quantity' => fake()->numberBetween(1, 20),
            'address_id' => Address::all()->random()->id,
            'free' => fake()->boolean(),
        ];
    }
}
