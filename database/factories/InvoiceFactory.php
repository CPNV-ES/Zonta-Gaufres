<?php

namespace Database\Factories;

use App\Models\InvoiceStatus;
use App\Models\Order;
use App\Models\Person;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Invoice;

/**
 * @extends Factory<\App\Models\Invoice>
 */
class InvoiceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return string
     */

    protected $model = Invoice::class;
    /**
     * Define the model's default state.
     *
     * @return array
     */

    public function definition(): array
    {
        $order_id = Order::all()->random()->id;
        return [
            'order_id' => $order_id,
            'client_id' => Person::all()->random()->id,
            'status_id' => InvoiceStatus::all()->random()->id,
            'creation_date' => fake()->date(),
            'payment_date' => fake()->date(),
            'total' => Order::find($order_id)->total_price(),
        ];
    }
}
