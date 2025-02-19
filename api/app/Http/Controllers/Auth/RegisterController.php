<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use App\Requests\RegisterFormRequest;
use App\Models\ProfileData;


class RegisterController extends Controller
{
    public function __invoke(RegisterFormRequest $request): JsonResponse
    {
        $user = new User();
        $user->role = 'user';
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = $request->password;
        $user->is_blocked = false;

        $user->save();

        $profileData = new ProfileData();
        $profileData->user_id = $user->id;
        $profileData->nb_calendars = 0;
        $profileData->nb_shared_calendars = 0;

        $profileData->save();

        $user = [
            ...$user->toArray(),
            'profile_data' => $profileData,
        ];

        return response()->json(compact('user'));
    }
}
