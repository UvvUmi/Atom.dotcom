<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Thread;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard', [
            'threads' => Thread::with(['user'])->paginate(5),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:20|min:1',
            'content' => 'required|string|max:50|min:1',
        ]);

        $data['user_id'] = auth()->id(); //user id sent via backend

        Thread::create($data); 


        return to_route('dashboard');
    }
}
