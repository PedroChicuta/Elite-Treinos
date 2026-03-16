<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'login']);

Route::group(['middleware' => 'auth:sanctum'], function () {

    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('/me', function (Request $request) {
        return $request->user();
    });
});
