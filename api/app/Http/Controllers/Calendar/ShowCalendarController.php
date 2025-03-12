<?php

namespace App\Http\Controllers\Calendar;

use App\Http\Controllers\Controller;
use App\Models\Calendar;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use RuntimeException;

class ShowCalendarController extends Controller
{
    public function __invoke(Request $request): JsonResponse
    {
        $authUser = auth()->user();

        $calendar = Calendar::with('theme', 'itemsCases')
            ->where('user_id', '=', $authUser->id)
            ->where('id', '=', $request->id)
            ->firstOrFail();

        if (!$calendar) {
            throw new RuntimeException('Calendrier non trouvé', 404);
        }
        return response()->json(compact('calendar'));
    }
}
