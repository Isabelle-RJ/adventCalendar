<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json('ce que tu veux');
});

Route::post('/register', RegisterController::class);
Route::get('/login', LoginController::class);
