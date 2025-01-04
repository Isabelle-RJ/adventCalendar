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
        $calendar = Calendar::query()->where('slug', '=', $request->slug)->first();
        $calendar->delete();
        return response()->json(['message' => 'Votre calendrier à bien été supprimé']);
    }
}
