<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use App\Requests\RegisterFormRequest;


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

        return response()->json($user);
    }
}
