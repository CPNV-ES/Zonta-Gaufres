<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\PeopleType;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<\App\Models\PeopleType>
 */
final class PeopleTypeFactory extends Factory
{
    /**
    * The name of the factory's corresponding model.
    *
    * @var string
    */
    protected $model = PeopleType::class;

    private static $counter = 0;

    /**
    * Define the model's default state.
    *
    * @return array
    */
    public function definition(): array
    {
        $peopleTypeArray = ["Staff", "DeliveryGuy", "Admin"];
        return [
            'name' => $peopleTypeArray[self::$counter++],
        ];
    }
}
