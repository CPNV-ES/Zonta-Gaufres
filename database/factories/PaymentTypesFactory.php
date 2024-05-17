<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\PaymentTypes;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<\App\Models\PaymentTypes>
 */
final class PaymentTypesFactory extends Factory
{
    /**
    * The name of the factory's corresponding model.
    *
    * @var string
    */
    protected $model = PaymentTypes::class;

    private static $counter = 0;

    /**
    * Define the model's default state.
    *
    * @return array
    */
    public function definition(): array
    {
        $paymentTypesArray = ["upstream", "delivery", "invoice"];
        return [
            'name' => $paymentTypesArray[self::$counter++],
        ];
    }
}
