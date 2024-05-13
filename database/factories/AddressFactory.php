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
        $faker = fake();
        return [
            'street' => $faker->streetName,
            'street_number' => $faker->buildingNumber,
            'country' => "Suisse",
            'region' => $faker->cantonName,
            'complement' => $faker->optional->word,
            'city_id' => \App\Models\City::factory(),
        ];
    }
}
