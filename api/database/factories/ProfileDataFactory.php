<?php

namespace Database\Factories;

use App\Models\Calendar;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProfileDataFactory extends Factory
{
    public function definition(): array
    {
        $userId = User::all()->random()->id;

        return [
            'user_id' => $userId,
            'nb_calendars' => Calendar::query()->where('user_id', '=', $userId)->count(),
            'nb_shared_calendars' => $this->faker->numberBetween(0, 10),
        ];
    }
}
