<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\DeliveryGuySchedule;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<\App\Models\DeliveryGuySchedule>
 */
final class DeliveryGuyScheduleFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = DeliveryGuySchedule::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition(): array
    {
        return [
            'start_delivery_time_window' => fake()->time(),
            'end_delivery_time_window' => fake()->time(),
            'person_id' => \App\Models\Person::factory(),
        ];
    }
}
