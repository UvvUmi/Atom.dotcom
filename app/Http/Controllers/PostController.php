<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Thread;
use App\Models\User;
use Exception;
use App\Models\Comment;
use Barryvdh\DomPDF\Facade\Pdf;

class PostController extends Controller
{
    public function show(string $id)
    {
        return Inertia::render('Thread', [
            'thread' => Thread::with(['user:id,name,avatar_url'])->findOrFail($id),
            'comments' => Comment::join('users', 'comments.user_id', '=', 'users.id')
                ->where('comments.thread_id', $id)->orderBy('created_at', 'desc')
                ->get(['comments.*', 'users.name as user_name', 'users.avatar_url']),
            'comment_count' => Thread::join('comments', 'threads.id', '=', 'comments.thread_id')
            ->where('comments.deleted_at', null)->where('threads.id', $id)->count('*'),
        ]);
    }

    public function makeComment(Request $request, string $id)
    {
        $data = $request->validate([
            'comment' => 'required|string|max:256|min:1',
        ]);

        $data['user_id'] = auth()->id();
        $data['thread_id'] = $id;

        if ($request['commentFile'] != null && $request['commentFilename'] != null) {
            $request->validate([
                'commentFile' => 'mimes:jpeg,jpg,png,gif|max:10240',
            ]);

            $fileURLfiltered = auth()->id().time().'.'.$request->commentFile->extension();
            $request->commentFile->move(public_path('uploads/comments'), $fileURLfiltered);

            $data['img_url'] = $fileURLfiltered;
            $data['img_name'] = $request['commentFilename'];
        }

        Comment::create($data);

        return back();

    }

    public function updateComment(Request $request, string $comment_id)
    {
        $request->validate([
            'editedComment' => 'required|string|max:256|min:1',
        ]);

        Comment::findOrFail($comment_id)->update(['comment' => $request['editedComment']]);
        
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
            try {
                if($comment['img_url'] != null) {
                    unlink(public_path('uploads/comments/'.$comment['img_url']));
                }
                $comment->delete();
            } catch(Exception $e) {
                $comment->delete();
            }
        }

        return back();
    }

    public function generatePDF(string $id, string $lang)
    {
        
        $data = [
            'thread' => Thread::with(['user:id,name,avatar_url'])->findOrFail($id),

            'comments' => Comment::join('users', 'comments.user_id', '=', 'users.id')
                ->where('comments.thread_id', $id)->orderBy('created_at', 'desc')
                ->get(['comments.*', 'users.name as user_name', 'users.avatar_url as avatar_link']),

            'comment_count' => Thread::join('comments', 'threads.id', '=', 'comments.thread_id')
            ->where('comments.deleted_at', null)->where('threads.id', $id)->count('*'),

            'language' => $lang,
        ];

        if(substr($data['thread']->img_url, 0,4) === 'http') {
            $data['thread']->is_local = false;
        } else {
            $data['thread']->is_local = true;
        }
        // Check if thread image is local
        
        $pdf = Pdf::loadView('pdf.thread', $data);

        $filename = preg_replace('/\s+/', '_', $data['thread']->title.'.pdf');

        return $pdf->stream($filename);
    }


}
