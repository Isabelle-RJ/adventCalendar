<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\File\GetFileController;


Route::get('/', function () {
    return response()->json('Hello');
});

Route::get('/public', GetFileController::class)->name('public');
