<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class ThemeFactory extends Factory
{

    /**
     * @inheritDoc
     */
    public function definition(): array
    {
        return [
            'theme_name' => $this->faker->name(),
            'image' => $this->faker->imageUrl(),
        ];
    }
}
