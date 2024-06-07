<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Enums\AddressTypesEnum;
use App\Models\AddressType;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<\App\Models\AddressType>
 */
final class AddressTypeFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = AddressType::class;

    private static $counter = 0;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition(): array
    {
        $addressTypeArray = array_column(AddressTypesEnum::cases(), "name");
        return [
            'name' => $addressTypeArray[self::$counter++],
        ];
    }
}
