<?php

namespace Database\Seeders;

use App\Models\Calendar;
use App\Models\ItemCase;
use App\Models\ProfileData;
use App\Models\Theme;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class PersonaSeeder extends Seeder
{
    public function run(): void
    {
        $persona = config('personaSeeder.persona');

        $this->users($persona['users']);
        $this->themes($persona['themes']);
        $this->calendars($persona['calendars']);
        $this->itemsCases($persona['itemsCases']);
        $this->profileData($persona['profileData']);
    }

    private function users(array $users): void
    {
        foreach ($users as $user) {
            $newUser = [
                'id' => $user['id'],
                'role' => $user['role'],
                'name' => $user['name'],
                'email' => $user['email'],
                'password' => Hash::make($user['password']),
                'is_blocked' => $user['is_blocked'],
            ];

            User::factory()
                ->create($newUser);
        }
    }

    private function themes(array $themes): void
    {
        foreach ($themes as $theme) {
            $newTheme = [
                'id' => $theme['id'],
                'theme_name' => $theme['theme_name'],
                'image' => $theme['image'],
                'slug' => Str::slug($theme['theme_name']),
                'user_id' => $theme['user_id'],
            ];

            Theme::factory()
                ->create($newTheme);
        }
    }

    private function calendars(array $calendars): void
    {
        foreach ($calendars as $calendar) {
            $newCalendar = [
                'id' => $calendar['id'],
                'user_id' => $calendar['user_id'],
                'theme_id' => $calendar['theme_id'],
                'title' => $calendar['title'],
                'id_share' => $calendar['id_share'],
                'slug' => Str::slug($calendar['title']),
            ];

            Calendar::factory()
                ->create($newCalendar);
        }
    }

    private function itemsCases(array $itemsCases): void
    {
        foreach ($itemsCases as $itemCase) {
            $newItemCase = [
                'id' => $itemCase['id'],
                'number' => $itemCase['number'],
                'gift' => $itemCase['gift'],
                'calendar_id' => $itemCase['calendar_id'],
                'is_opened' => $itemCase['is_opened'],
                'opened_at' => $itemCase['opened_at'],
                'slug' => Str::slug($itemCase['gift']),
            ];

            ItemCase::factory()
                ->create($newItemCase);
        }
    }
    private function profileData(array $profileData): void
    {
        ProfileData::all()->each->delete();
        foreach ($profileData as $profile) {
            $newProfileData = [
                'user_id' => $profile['user_id'],
                'nb_shared_calendars' => $profile['nb_shared_calendars'],
            ];

            ProfileData::factory()
                ->create($newProfileData);
        }
    }
}
