<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\PersonType;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<\App\Models\PersonType>
 */
final class PersonTypeFactory extends Factory
{
    /**
    * The name of the factory's corresponding model.
    *
    * @var string
    */
    protected $model = PersonType::class;

    private static $counter = 0;

    /**
    * Define the model's default state.
    *
    * @return array
    */
    public function definition(): array
    {
        $personTypeArray = ["Staff", "DeliveryGuy", "Admin"];
        return [
            'name' => $personTypeArray[self::$counter++],
        ];
    }
}
