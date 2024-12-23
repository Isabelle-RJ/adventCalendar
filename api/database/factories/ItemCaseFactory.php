<?php

namespace Database\Factories;

use App\Models\Calendar;
use Illuminate\Database\Eloquent\Factories\Factory;

class ItemCaseFactory extends Factory
{

    /**
     * @inheritDoc
     */
    public function definition(): array
    {
        $isOpened = $this->faker->boolean();

        return [
            'number' => $this->faker->numberBetween(1, 25),
            'gift' => $this->faker->sentences(),
            'calendar_id' => Calendar::all()->random()->id,
            'is_opened' => $isOpened,
            'opened_at' => $isOpened ? $this->faker->dateTime() : null,
        ];
    }
}
