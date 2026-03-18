<?php

namespace App\Providers;

use App\Models\Personal;
use App\Models\SuperAdmin;
use App\Models\Usuario;
use Gate;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        Gate::define('is-personal', function (Usuario $user) {
            $personal = Personal::where('id_usuario', $user->id_usuario)->first();

            return (bool) $personal;
        });

        Gate::define('is-super-admin', function (Usuario $user) {
            $superAdmin = SuperAdmin::where('id_usuario', $user->id_usuario)->first();

            return (bool) $superAdmin;
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
