<?php

namespace App\Http\Controllers\Calendar;

use App\Http\Controllers\Controller;
use App\Models\Calendar;
use Illuminate\Http\JsonResponse;

class IndexCalendarController extends Controller
{
    public function __invoke(): JsonResponse
    {
        $authenticatedUser = auth()->user();
        $calendars = Calendar::with('theme', 'user', 'itemsCases')->where('user_id', '=', $authenticatedUser->id)->get();
        return response()->json(compact('calendars'));
    }
}
