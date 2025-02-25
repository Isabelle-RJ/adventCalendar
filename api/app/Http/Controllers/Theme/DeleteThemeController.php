<?php

namespace App\Http\Controllers\Theme;

use App\Http\Controllers\Controller;
use App\Models\Theme;
use Illuminate\Support\Facades\Storage;
use RuntimeException;

class DeleteThemeController extends Controller
{
    public function __invoke(): void
    {
        $auth = auth()->user();

        $theme = Theme::query()->where('user_id', '=', $auth->id)->where('slug', '=', request()->slug)->first();

        if ($theme === null) {
            throw new RuntimeException('Theme not found', 404);
        }

        Storage::disk('public')->delete($theme->image);

        $theme->delete();
    }
}
