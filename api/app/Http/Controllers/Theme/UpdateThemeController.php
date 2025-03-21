<?php

namespace App\Http\Controllers\Theme;

use App\Http\Controllers\Controller;
use App\Models\Theme;
use App\Requests\UpdateThemesFormRequest;
use Illuminate\Support\Facades\Storage;
use RuntimeException;
use Illuminate\Support\Str;

class UpdateThemeController extends Controller
{
    private const UPLOADS_DIRECTORY = 'uploads';

    public function __invoke(UpdateThemesFormRequest $request): void
    {
        $auth = auth()->user();

        $theme = Theme::query()->where('user_id', '=', $auth->id)->where('id', '=', $request->id)->first();

        if (!$theme) {
            throw new RuntimeException('Theme not found', 404);
        }

        Storage::disk('public')->delete($theme->image);

        $theme->theme_name = $request->theme_name;
        $theme->image = $this->checkPath($request->image);
        $theme->slug = Str::slug(pathinfo($request->theme_name, PATHINFO_FILENAME));

        $theme->save();
    }

    private function checkPath(string $path): string
    {
        $directory = self::UPLOADS_DIRECTORY;

        if (str_contains($path, '/uploads/')) {
            return $path;
        }

        return $directory . '/' . $path;
    }
}
