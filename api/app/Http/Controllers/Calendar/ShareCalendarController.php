<?php

namespace App\Http\Controllers\Calendar;

use App\Http\Controllers\Controller;
use App\Models\Calendar;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;
use RuntimeException;

class ShareCalendarController extends Controller
{
    public function __invoke(Request $request): JsonResponse
    {
        $calendar = Calendar::query()->where('id', '=', $request->id)->first();

        if (!$calendar) {
            throw new RuntimeException('Calendrier non trouvé', 404);
        }
        $url = URL::signedRoute('share-calendar', ['id' => $calendar->id]);
        $parseUrl = parse_url($url, PHP_URL_QUERY);
        parse_str($parseUrl, $params);
        $signature = $params['signature'] ?? null;

        return response()->json([
            'message' => 'Calendrier partagé avec succès!',
            'signature' => $signature,
            'id' => $calendar->id,
        ]);

    }
}
