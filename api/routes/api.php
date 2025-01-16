<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Calendar\DeleteCalendarController;
use App\Http\Controllers\Calendar\IndexCalendarController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Theme\CreateThemeController;
use App\Http\Controllers\File\UploadFilesController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->group(
    function () {
        Route::post('/logout', LogoutController::class);
        Route::get('/calendars', IndexCalendarController::class);
        Route::delete('/calendars/{slug}', DeleteCalendarController::class);
        Route::post('/themes/create', CreateThemeController::class);
        Route::post('/themes/uploads', UploadFilesController::class);
    }
);

Route::post('/register', RegisterController::class);
Route::post('/login', LoginController::class);
