<?php

namespace App\Http\Controllers\Theme;

use App\Http\Controllers\Controller;
use App\Requests\CreateThemeFormRequest;
use Illuminate\Http\JsonResponse;
use App\Models\Theme;
use Illuminate\Support\Str;

class CreateThemeController extends Controller
{
    public function __invoke(CreateThemeFormRequest $request): JsonResponse
    {
        $authenticatedUser = auth()->user()->role;
        if ($authenticatedUser !== 'admin') {
            return response()->json(['error' => 'Vous n\'avez pas les droits pour créer un thème.']);
        }
        $theme = new Theme();
        $theme->theme_name = $request->theme_name;
        $theme->user_id = $authenticatedUser->id;
        $theme->image = $request->image;
        $theme->slug = Str::slug($request->theme_name);
        $theme->save();

        return response()->json(['message' => 'Votre thème à bien été créé.']);
    }
}
