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
        $authenticatedUser = auth()->user();

        $theme = new Theme();
        $theme->theme_name = $request->theme_name;
        $theme->user_id = $authenticatedUser->id;
        $theme->image = $request->theme_name;
        $theme->slug = Str::slug(pathinfo($request->theme_name, PATHINFO_FILENAME));

        $theme->save();

        return response()->json(['message' => 'Votre thème à bien été créé.']);
    }
}
