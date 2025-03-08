<?php

namespace App\Http\Controllers\Calendar;

use App\Http\Controllers\Controller;
use App\Models\Calendar;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use RuntimeException;

class ShowShareCalendarController extends Controller
{
    public function __invoke(Request $request): JsonResponse
    {
        if ($request->hasValidSignature()) {
            $calendar = Calendar::with('theme', 'itemsCases')
                ->where('id', '=', $request->id)
                ->first();

            if (!$calendar) {
                throw new RuntimeException('Calendrier non trouvé', 404);
            }

            return response()->json(compact('calendar'));
        }
        throw new RuntimeException('Invalid signature', 403);
    }
}
