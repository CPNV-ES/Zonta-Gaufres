<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\Person;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<\App\Models\Person>
 */
final class PersonFactory extends Factory
{
    /**
    * The name of the factory's corresponding model.
    *
    * @var string
    */
    protected $model = Person::class;

    /**
    * Define the model's default state.
    *
    * @return array
    */
    public function definition(): array
    {
        return [
            'firstname' => fake()->optional()->firstName,
            'lastname' => fake()->optional()->lastName,
            'email' => fake()->safeEmail,
            'company' => fake()->optional()->company,
            'phone_number' => fake()->optional()->mobileNumber,
        ];
    }
}
