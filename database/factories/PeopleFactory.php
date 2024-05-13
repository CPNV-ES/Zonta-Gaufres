<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\People;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<\App\Models\People>
 */
final class PeopleFactory extends Factory
{
    /**
    * The name of the factory's corresponding model.
    *
    * @var string
    */
    protected $model = People::class;

    /**
    * Define the model's default state.
    *
    * @return array
    */
    public function definition(): array
    {
        $faker = fake();
        return [
            'firstname' => $faker->firstName,
            'lastname' => $faker->lastName,
            'email' => $faker->optional->safeEmail,
            'entreprise' => $faker->optional->company,
            'phone_number' => $faker->mobileNumber,
        ];
    }
}
