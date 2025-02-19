<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\ProfileData;
use App\Requests\LoginFormRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function __invoke(LoginFormRequest $request): JsonResponse
    {
        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            if (auth()->user()->is_blocked) {

                return response()->json(['error' => [
                    "message" => "Votre compte est bloqué!",
                    "status" => 403
                ]], 403);
            }
            $token = auth()->user()->createToken('token-name')->plainTextToken;
            $authUser = Auth::user();
            $profileData = ProfileData::query()->where('user_id', $authUser->id)->first();

            $user = [
                ...$authUser->toArray(),
                'profile_data' => $profileData,
            ];

            return response()->json(compact('token', 'user'));
        }


        return response()->json(['error' => [
            "message" => "Vos identifiants ou mot de passe sont incorrects",
            "status" => 401
        ]], 401);
    }
}
