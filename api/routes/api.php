<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Calendar\CreateCalendarController;
use App\Http\Controllers\Calendar\DeleteCalendarController;
use App\Http\Controllers\Calendar\IndexCalendarController;
use App\Http\Controllers\Calendar\ShareCalendarController;
use App\Http\Controllers\Calendar\ShowCalendarController;
use App\Http\Controllers\Calendar\ShowShareCalendarController;
use App\Http\Controllers\Theme\DeleteThemeController;
use App\Http\Controllers\Theme\IndexThemeController;
use App\Http\Controllers\Theme\UpdateThemeController;
use App\Models\ProfileData;
use App\Models\Theme;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Theme\CreateThemeController;
use App\Http\Controllers\File\UploadFilesController;
use Illuminate\Support\Facades\Storage;

Route::get('/user', static function (Request $request) {
    $user = $request->user();
    $profileData = ProfileData::query()->where('user_id', '=', $user->id)->first();

    $user->profile_data = $profileData;

    return $user;
})->middleware('auth:sanctum');

Route::post('/checkPath', static function (Request $request) {
    $path = $request->theme;

    $user = $request->user();


    $theme = Theme::query()
        ->where('user_id', '=', $user->id)
        ->where('image', '=', $path)->first();

    if (!$theme) {
        throw new RuntimeException('Theme not found');
    }

    if (!Storage::disk('public')->exists($path)) {
        throw new RuntimeException('File not found');
    }

    return true;
})->middleware('auth:sanctum');
Route::middleware('auth:sanctum')->group(
    function () {
        Route::post('/logout', LogoutController::class);
        Route::get('/calendars', IndexCalendarController::class);
        Route::post('/calendars/create', CreateCalendarController::class);
        Route::delete('/calendars/{slug}', DeleteCalendarController::class);
        Route::post('/themes/create', CreateThemeController::class);
        Route::post('/themes/uploads', UploadFilesController::class);
        Route::delete('/themes/{slug}', DeleteThemeController::class);
        Route::patch('/themes/{id}', UpdateThemeController::class);
        Route::get('/themes', IndexThemeController::class);
        // Route qui permet de récupérer le lien de partage d'un calendrier pour la modal.
        Route::get('/share-calendar/{id}', ShareCalendarController::class);
        Route::get('/calendars/{id}', ShowCalendarController::class)->whereUuid('id');
    }
);

//Route qui permet de récupérer le calendrier que l'utilisateur non connecté à reçu.
// Fonction URL de Laravel oblige d'avoir un name à la route.
Route::get('/show-share-calendar/{id}', ShowShareCalendarController::class)->name('share-calendar');

Route::post('/register', RegisterController::class);
Route::post('/login', LoginController::class);
