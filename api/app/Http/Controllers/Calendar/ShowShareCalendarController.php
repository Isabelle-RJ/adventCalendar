<?php

namespace App\Http\Controllers\Calendar;

use App\Http\Controllers\Controller;
use App\Models\Calendar;
use Illuminate\Http\Request;
use RuntimeException;

class ShowShareCalendarController extends Controller
{
    public function __invoke(Request $request): void
    {
        if ($request->hasValidSignature()) {
            $calendar = Calendar::with('theme', 'itemsCases')
                ->where('id', '=', $request->id)
                ->first();

            if (!$calendar) {
                throw new RuntimeException('Calendrier non trouvé', 404);
            }
            dd($calendar);
        }
        throw new RuntimeException('Invalid signature', 403);
    }
}
