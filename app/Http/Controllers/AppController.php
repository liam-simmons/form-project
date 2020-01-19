<?php

namespace App\Http\Controllers;

class AppController extends Controller
{
    public function app()
    {
        // Serve-up the index.html file, containing the compiled frontend.

        $app = public_path('build/index.html');

        if (!file_exists($app)) {
            return abort(404, "File not found {$app}");
        }

        return file_get_contents($app);
    }
}
