<?php

use App\Http\Controllers\Auth\RegisterController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json('Jade');
});

Route::post('/register', RegisterController::class);

