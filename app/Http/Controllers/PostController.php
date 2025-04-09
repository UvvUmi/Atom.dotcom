<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Thread;
use App\Models\Comment;

class PostController extends Controller
{
    public function show(string $id)
    {
        return Inertia::render('Thread', [
            'thread' => Thread::findOrFail($id),
            'comments' => Comment::select('*')->where('thread_id', $id)->get()->toArray(),
        ]);
    }
}
