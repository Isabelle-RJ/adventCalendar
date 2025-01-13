<?php

namespace App\Http\Controllers\Calendar;

use App\Http\Controllers\Controller;
use App\Models\Calendar;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DeleteCalendarController extends Controller
{
    public function __invoke(Request $request): JsonResponse
    {
        $authenticatedUser = auth()->user();
        $calendar = Calendar::query()->where('user_id', '=', $authenticatedUser->id)->where('slug', '=', $request->slug)->first();

        if (!$calendar) {
            return response()->json(['error' => 'Calendrier non trouvé'], 404);
        }
        $calendar->delete();
        return response()->json(['message' => 'Votre calendrier à bien été supprimé']);
    }
}
