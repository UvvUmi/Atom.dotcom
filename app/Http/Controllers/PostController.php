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
            'comments' => Comment::join('users', 'comments.user_id', '=', 'users.id')
                ->where('comments.thread_id', $id)->orderBy('created_at', 'desc')
                ->get(['comments.*', 'users.name as user_name']),
            'comment_count' => Thread::join('comments', 'threads.id', '=', 'comments.thread_id')
            ->where('comments.deleted_at', null)->where('threads.id', $id)->count('*'),
        ]);
    }

    public function makeComment(Request $request, string $id)
    {
        $data = $request->validate([
            'comment' => 'required|string|max:50|min:1',
        ]);
        $data['user_id'] = auth()->id();
        $data['thread_id'] = $id;

        Comment::create($data);

        return back();

    }

    public function destroyThread($id)
    {
        $thread = Thread::findOrFail($id);


        if($thread['user_id'] === auth()->id()) {
            unlink(public_path('uploads/'.$thread['img_url']));
            $thread->delete();
        }

        return redirect('/');
    }

    public function destroyComment($comment_id)
    {
        $comment = Comment::findOrFail($comment_id);

        if($comment['user_id'] === auth()->id()) {
            $comment->delete();
        }

        return back();
    }

}
