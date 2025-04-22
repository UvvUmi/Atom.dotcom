<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Mail;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);
        $data['password'] = Hash::make($request->password);

        if ($request['avatar'] != null) {
            $request->validate([
                'avatar' => 'mimes:jpeg,jpg,png,gif,webm|max:10240',
            ]);

            $avatarPathFiltered = auth()->id().time().'.'.$request->avatar->extension();
            $request->avatar->move(public_path('uploads/avatars'), $avatarPathFiltered );

            $data['avatar_url'] = $avatarPathFiltered;

        }

        $user = User::create($data);
        

        event(new Registered($user));

        Auth::login($user);

        if(isset($_COOKIE['language']) && $_COOKIE['language'] === 'lt') {
            $content = "Sveiki, {$request->name}\nMalonu Jumis matyti!";
            $subject = "Atom Registracija";
        }
        else {
            $content = "Welcome, {$request->name}\nNice to see you!";
            $subject = "Atom Registration";
        }

        Mail::raw($content, function($message) use ($request, $subject) {
            $message->to($request->email)->subject($subject);
        });

        return redirect(route('dashboard', absolute: false));
    }
}
