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

        $user->sendEmailVerificationNotification(); //this sends email

        Auth::login($user);

        return redirect(route('dashboard', absolute: false));
    }
}
