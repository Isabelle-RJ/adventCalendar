<?php

namespace App\Http\Controllers\Calendar;

use App\Http\Controllers\Controller;
use App\Models\Calendar;
use Illuminate\Http\Request;
use RuntimeException;

class ShowCalendarController extends Controller
{
    public function __invoke(Request $request): void
    {
        //récupérer le calendrier que l'utilisateur veut voir
        //retourner le calendrier
        $authUser = auth()->user();

        if ($authUser) {
            $calendar = Calendar::with('theme', 'itemsCases')
                ->where('user_id', '=', $authUser->id)
                ->where('id', '=', $request->id)
                ->first();

            if (!$calendar) {
                throw new RuntimeException('Calendrier non trouvé', 404);
            }
            dd($calendar);
        }

    }
}
