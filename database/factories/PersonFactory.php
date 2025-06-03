<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\Person;
use App\Models\PersonType;
use App\Enums\PersonTypesEnum;
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
            'firstname' => fake()->firstName,
            'lastname' => fake()->lastName,
            'email' => fake()->safeEmail,
            'company' => fake()->company,
            'phone_number' => fake()->mobileNumber,
        ];
    }

    public function configure()
    {
        return $this->afterCreating(function (Person $person) {
            // Attach random roles (types) to the person
            $roles = PersonTypesEnum::cases(); // Get all enum cases
            $selectedRoles = $this->faker->randomElements($roles, rand(1, count($roles))); // Select 1 or more roles randomly

            foreach ($selectedRoles as $role) {
                $personType = PersonType::firstOrCreate(['name' => $role->name]); // Ensure the type exists
                $person->personType()->attach($personType); // Attach the type to the person
            }
        });
    }
}
