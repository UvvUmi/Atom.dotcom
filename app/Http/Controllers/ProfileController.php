<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Thread;
use App\Models\User;
use Exception;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */

    public function show($id)
    {
        return Inertia::render('Profile/Profile', [
            'user' => User::findOrFail($id),
            'threads' => Thread::select('threads.id', 'threads.title')->where('threads.user_id', $id)->get(),
            'thread_count' => Thread::where('user_id', $id)->count(),
        ]);
    }

    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        try {
            if($user['avatar_url'] != null) {
                unlink(public_path('uploads/avatars/'.$user['avatar_url']));
            }
            $user->delete();
        } catch(Exception $e) {
            $user->delete();
        }

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
