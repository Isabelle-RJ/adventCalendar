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
        if ($auth->role !== 'admin') {
            abort(403, 'Unauthorized');
        }

        $theme = Theme::query()->where('slug', '=', request()->slug)->first();

        if ($theme === null) {
            throw new RuntimeException('Theme not found', 404);
        }

        Storage::disk('public')->delete($theme->image);

        $theme->delete();
    }
}
