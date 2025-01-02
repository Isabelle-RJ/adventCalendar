<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json('Hello');
});

Route::post('/register', RegisterController::class);
Route::post('/login', LoginController::class);
