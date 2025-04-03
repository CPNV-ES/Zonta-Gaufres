<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\Address;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<\App\Models\Address>
 */
final class AddressFactory extends Factory
{
    /**
    * The name of the factory's corresponding model.
    *
    * @var string
    */
    protected $model = Address::class;

    /**
    * Define the model's default state.
    *
    * @return array
    */
    public function definition(): array
    {
        return [
            'street' => fake()->streetName(),
            'street_number' => fake()->buildingNumber(),
            'country' => "Suisse",
            'region' => fake()->cantonName(),
            'complement' => fake()->optional()->word(),
            'city_id' => \App\Models\City::factory(),
        ];
    }
}
