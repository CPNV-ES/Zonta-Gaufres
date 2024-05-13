<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\BillingInformation;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<\App\Models\BillingInformation>
 */
final class BillingInformationFactory extends Factory
{
    /**
    * The name of the factory's corresponding model.
    *
    * @var string
    */
    protected $model = BillingInformation::class;

    /**
    * Define the model's default state.
    *
    * @return array
    */
    public function definition(): array
    {
        return [
            'IBAN' => fake()->bankAccountNumber,
            'people_id' => \App\Models\People::factory(),
        ];
    }
}
