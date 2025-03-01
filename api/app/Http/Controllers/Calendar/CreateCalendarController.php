<?php

namespace App\Http\Controllers\Calendar;

use App\Http\Controllers\Controller;
use App\Models\Calendar;
use App\Models\ItemCase;
use App\Models\ProfileData;
use App\Models\Theme;
use App\Requests\CreateCalendarFormRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class CreateCalendarController extends Controller
{
    public function __invoke(CreateCalendarFormRequest $request): JsonResponse
    {
        return DB::transaction(static function () use ($request) {
            $calendar = new Calendar();
            $authUser = auth()->user();
            $theme = Theme::query()->where('image', $request->image)->first();

            $calendar->title = $request->title;
            $calendar->user_id = $authUser->id;
            $calendar->theme_id = $theme->id;
            $calendar->slug = Str::slug($request->title);

            $calendar->save();

            $profileData = ProfileData::query()->where('user_id', '=', $authUser->id)->first();
            $count_calendars = Calendar::query()->where('user_id', '=', $authUser->id)->count();

            $profileData->nb_calendars = $count_calendars;

            $profileData->save();

            foreach ($request->items_case as $itemCase) {
                $eloquentItemCase = new ItemCase();
                $eloquentItemCase->number = $itemCase['number'];
                $eloquentItemCase->gift = $itemCase['gift'];
                $eloquentItemCase->calendar_id = $calendar->id;
                $eloquentItemCase->is_opened = false;
                $eloquentItemCase->opened_at = null;
                $eloquentItemCase->slug = Str::slug($itemCase['gift']);

                $eloquentItemCase->save();
            }

            return response()->json([
                'message' => 'Calendrier créé avec succès!',
                'calendar' => $calendar,
            ], 201);
        });
    }
}
