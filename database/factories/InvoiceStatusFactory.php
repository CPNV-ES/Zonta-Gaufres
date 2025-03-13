<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Enums\InvoiceStatusEnum;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\InvoiceStatus;

/**
 * @extends Factory<\App\Models\InvoiceStatus>
 */
final class InvoiceStatusFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = InvoiceStatus::class;

    private static $counter = 0;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition(): array
    {
        $InvoiceStatusArray = array_column(InvoiceStatusEnum::cases(), "name");
        return [
            'name' => $InvoiceStatusArray[self::$counter++],
        ];
    }
}
