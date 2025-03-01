<?php

namespace App\Http\Controllers\Theme;

use App\Http\Controllers\Controller;
use App\Models\Theme;
use Illuminate\Http\JsonResponse;

class IndexThemeController extends Controller
{
    public function __invoke(): JsonResponse
    {
        $authUser = auth()->user();
        $themes = Theme::query()->where('user_id', '=', $authUser->id)->orderByDesc('updated_at')->get();

        return response()->json(compact('themes'));
    }
}
