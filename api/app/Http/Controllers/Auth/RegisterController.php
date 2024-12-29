<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class RegisterController extends Controller
{
    public function __invoke(Request $request): JsonResponse
    {
        $user = new User();
        $user->role = $request->role;
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = $request->password;
        $user->is_blocked = false;

        $user->save();

        return response()->json($user);
    }
}
