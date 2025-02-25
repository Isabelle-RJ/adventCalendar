<?php

namespace App\Http\Controllers\Theme;

use App\Http\Controllers\Controller;
use App\Requests\CreateThemeFormRequest;
use Illuminate\Http\JsonResponse;
use App\Models\Theme;
use Illuminate\Support\Str;

class CreateThemeController extends Controller
{
    CONST UPLOADS_DIRECTORY = 'uploads';

    public function __invoke(CreateThemeFormRequest $request): JsonResponse
    {
        $authenticatedUser = auth()->user();

        $theme = new Theme();
        $theme->theme_name = $request->theme_name;
        $theme->user_id = $authenticatedUser->id;
        $theme->image = $this->transformThemeName($request->theme_name);
        $theme->slug = Str::slug(pathinfo($request->theme_name, PATHINFO_FILENAME));

        $theme->save();

        return response()->json(['message' => 'Votre thème à bien été créé.']);
    }

    // Add uplaods/ directory to the theme name
    private function transformThemeName(string $themeName): string
    {
        $directory = self::UPLOADS_DIRECTORY;

        return $directory . '/' . $themeName;
    }
}
