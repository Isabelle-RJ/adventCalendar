<?php

namespace App\Http\Controllers\Calendar;

use App\Http\Controllers\Controller;
use App\Models\Calendar;
use App\Models\ProfileData;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DeleteCalendarController extends Controller
{
    public function __invoke(Request $request): JsonResponse
    {
        $authUser = auth()->user();
        $calendar = Calendar::query()->where('user_id', '=', $authUser->id)->where('slug', '=', $request->slug)->first();

        if (!$calendar) {
            return response()->json(['error' => 'Calendrier non trouvé'], 404);
        }
        $calendar->delete();

        $profileData = ProfileData::query()->where('user_id', '=', $authUser->id)->first();
        $count_calendars = Calendar::query()->where('user_id', '=', $authUser->id)->count();

        $profileData->nb_calendars = $count_calendars;

        $profileData->save();

        return response()->json(['message' => 'Votre calendrier à bien été supprimé']);
    }
}
