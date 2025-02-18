<?php

namespace App\Http\Controllers\Theme;

use App\Http\Controllers\Controller;
use App\Models\Theme;
use App\Requests\UpdateThemesFormRequest;
use RuntimeException;
use Illuminate\Support\Str;

class UpdateThemeController extends Controller
{
    CONST UPLOADS_DIRECTORY = 'uploads';

    public function __invoke(UpdateThemesFormRequest $request): void
    {
        $authUser = auth()->user();

        if ($authUser->role !== 'admin') {
            throw new RuntimeException('Unauthorized', 401);
        }

        $theme = Theme::query()->where('slug', '=', $request->slug)->first();

        if (!$theme) {
            throw new RuntimeException('Theme not found', 404);
        }

        $theme->theme_name = $request->theme_name;
        $theme->image = $this->checkPath($request->image);
        $theme->slug = Str::slug($request->theme_name);

        $theme->save();
    }

    private function checkPath(string $path): string
    {
        $directory = self::UPLOADS_DIRECTORY;

        if (str_contains($path, 'uploads/')) {
            return $path;
        }

        return $directory . '/' . $path;
    }
}
