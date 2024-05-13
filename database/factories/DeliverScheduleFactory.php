<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\DeliverSchedule;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<\App\Models\DeliverSchedule>
 */
final class DeliverScheduleFactory extends Factory
{
    /**
    * The name of the factory's corresponding model.
    *
    * @var string
    */
    protected $model = DeliverSchedule::class;

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
