<?php

namespace App\Console\Commands;

use App\Models\ProfileData;
use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;

class AdminRegister extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'admin:register';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Admin Register Command';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $name = $this->ask('Quel est votre nom?');
        $email = $this->ask('Quel est votre email?');
        $password = $this->secret('Quel est votre mot de passe?');

        $validator = validator(
            [
                'name' => $name,
                'email' => $email,
                'password' => $password,
            ],
            [
                'name' => 'required|string',
                'email' => 'required|email',
                'password' => 'required|string|min:8',
            ]
        );

        if ($validator->fails()) {
            $this->error('Entrée invalide');
            $this->error($validator->errors());
            return self::FAILURE;
        }

        $admin = new User();
        $admin->name = $name;
        $admin->role = 'admin';
        $admin->email = $email;
        $admin->password = Hash::make($password);
        $admin->is_blocked = false;

        $admin->save();

        $profileData = new ProfileData();
        $profileData->user_id = $admin->id;
        $profileData->nb_calendars = 0;
        $profileData->nb_shared_calendars = 0;

        $profileData->save();

        $this->info('Admin enregistré avec succès');

        return self::SUCCESS;
    }
}
