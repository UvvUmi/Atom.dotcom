<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Notifications\Messages\MailMessage;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        VerifyEmail::toMailUsing(function ($notifiable, $url) {
            if (isset($_COOKIE['language']) && $_COOKIE['language'] === 'lt') {
                return (new MailMessage)
                    ->subject('Patvirtinkite el. pašto adresą')
                    ->line('Paspauskite mygtuką žemiau, kad atlikti veiksmą.')
                    ->line('Jeigu jus nesiregistravote, nieko daryti nereikia.')
                    ->action('Patvirtinti el. paštą', $url);
            }
            else {
                return (new MailMessage)
                    ->subject('Verify email address')
                    ->line('Click the button below to complete the registration.')
                    ->line('If it was not you, no further action is needed.')
                    ->action('Verify email', $url);
            }
        });
    }
}
