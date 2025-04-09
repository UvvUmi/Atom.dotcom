<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Thread;
use App\Models\User;
use App\Models\Comment;

class PostController extends Controller
{
    public function show(string $id)
    {
        return Inertia::render('Thread', [
            'thread' => Thread::with(['user:id,name'])->findOrFail($id),
            'comments' => Comment::where('thread_id', $id)->get()->map(function ($comment) {
                    $comment->user_name = User::find($comment->user_id)->name ?? 'Commenter';
                    return $comment;
                })->toArray(),
        ]);
    }
}
