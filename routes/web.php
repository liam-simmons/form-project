<?php

use Illuminate\Support\Facades\Route;

// The frontend is an SPA, so point all URIs (except /api/*) to the AppController.
Route::get('{uri?}', 'AppController@app')->where(['uri' => '^(?!api).*$'])->name('app');
