<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Auth\Events\Verified;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Mail;

class VerifyEmailController extends Controller
{
    /**
     * Mark the authenticated user's email address as verified.
     */
    public function __invoke(EmailVerificationRequest $request): RedirectResponse
    {
        if ($request->user()->hasVerifiedEmail()) {
            return redirect()->intended(route('dashboard', absolute: false).'?verified=1');
        }

        if ($request->user()->markEmailAsVerified()) {
            if(isset($_COOKIE['language']) && $_COOKIE['language'] === 'lt') {
                $content = "Sveiki, {$request->user()->name}\nMalonu Jumis matyti!\nDabar galite kurti savo įrašus!";
                $subject = "Atom Registracija";
            }
            else {
                $content = "Welcome, {$request->user()->name}\nNice to see you!\nNow you can create your own threads!";
                $subject = "Atom Registration";
            }
    
            Mail::raw($content, function($message) use ($request, $subject) {
                $message->to($request->user()->email)->subject($subject);
            });
            
            event(new Verified($request->user()));
        }

        return redirect()->intended(route('dashboard', absolute: false).'?verified=1');
    }
}
