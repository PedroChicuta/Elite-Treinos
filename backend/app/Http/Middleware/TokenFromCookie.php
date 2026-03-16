<?php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class TokenFromCookie
{
    public function handle(Request $request, Closure $next)
    {
        if ($token = $request->cookie('access_token')) {
            $request->headers->set('Authorization', 'Bearer ' . $token);
        }

        return $next($request);
    }
}