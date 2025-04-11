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
            'threads' => Thread::with('user')->orderBy('created_at', 'desc')->paginate(5),
        ]);
    }
    

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:40|min:1',
            'content' => 'required|string|max:50|min:1',
        ]);

        $data['user_id'] = auth()->id(); //user id sent via backend
        $data['themeId'] = strval(rand(0, 3));

        Thread::create($data); 

        return redirect('/');
    }

    public function destroy($id)
    {
        $thread = Thread::findOrFail($id);


        if($thread['user_id'] === auth()->id()) {
            $thread->delete();
        }

        return back();
    }
}
