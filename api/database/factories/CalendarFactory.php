<?php

namespace Database\Factories;

use App\Models\Theme;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class CalendarFactory extends Factory
{

    /**
     * @inheritDoc
     */
    public function definition(): array
    {
        return [
            'user_id' => User::all()->random()->id,
            'theme_id' => Theme::all()->random()->id,
            'title' => $this->faker->name(),
        ];
    }
}
