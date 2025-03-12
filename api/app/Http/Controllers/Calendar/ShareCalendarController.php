<?php

namespace App\Http\Controllers\Calendar;

use App\Http\Controllers\Controller;
use App\Models\Calendar;
use App\Models\ProfileData;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;
use RuntimeException;

class ShareCalendarController extends Controller
{
    public function __invoke(Request $request): JsonResponse
    {
        $authUser = auth()->user();
        $calendar = Calendar::query()
            ->where('user_id', '=', $authUser->id)
            ->where('id', '=', $request->id)
            ->first();
        //select * from calendars where user_id = :user_id and id = :id

        if (!$calendar) {
            throw new RuntimeException('Calendrier non trouvé', 404);
        }
        $url = URL::signedRoute('share-calendar', ['id' => $calendar->id]);
        $parseUrl = parse_url($url, PHP_URL_QUERY);
        parse_str($parseUrl, $params);
        $signature = $params['signature'] ?? null;

        $profilData = ProfileData::query()->where('user_id', '=', $calendar->user_id)->first();
        $profilData->nb_shared_calendars = $profilData->nb_shared_calendars + 1;

        $profilData->save();

        return response()->json([
            'message' => 'Calendrier partagé avec succès!',
            'signature' => $signature,
            'id' => $calendar->id,
        ]);
    }
}
