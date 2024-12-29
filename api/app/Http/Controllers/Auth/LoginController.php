<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Requests\LoginFormRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function __invoke(LoginFormRequest $request): JsonResponse
    {
        if (Auth::attempt($request->email, $request->password)) {
            $request->session()->regenerate();

            return response()->json(Auth::user());
        }

        return response()->json(['error'=> "Il y a une erreur!"]);
    }
}
