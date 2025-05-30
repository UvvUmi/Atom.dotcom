<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Thread;
use App\Models\Comment;
use Exception;
use Inertia\Inertia;

class DashboardController extends Controller
{
    
    public function index()
    {
        if(isset($_COOKIE['filter']) && $_COOKIE['filter'] === 'old') {
            $threads['threads'] = Thread::with('user')->orderBy('created_at', 'asc')->paginate(9);
        } 
        else if(isset($_COOKIE['filter']) && $_COOKIE['filter'] === 'comment') {
            $threads['threads'] = Thread::with('user')->withCount('comments')->orderBy('comments_count', 'desc')->paginate(9);
        }
        else {
            $threads['threads'] = Thread::with('user')->orderBy('created_at', 'desc')->paginate(9);
        } 
        
        $threads['comment_count_object'] = 
             Comment::join('threads', 'comments.thread_id', '=', 'threads.id')
            ->where('comments.deleted_at', null)->select('comments.thread_id', Comment::raw('COUNT(*) as CommentCount'))
            ->groupBy('comments.thread_id')->pluck('CommentCount', 'thread_id');
        
        return Inertia::render('Dashboard', $threads);
    }
    

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:40|min:1',
            'content' => 'required|string|max:100|min:1',
            'file' => 'required|mimes:jpeg,jpg,png,gif|max:10240',
        ]);

        $data['user_id'] = auth()->id();
        $data['themeId'] = strval(rand(0, 3));
        

        $fileNameFiltered = auth()->id().time().'.'.$request->file->extension();
        $request->file->move(public_path('uploads'), $fileNameFiltered);

        $data['img_url'] = $fileNameFiltered;
        $data['img_name'] = $request['filename'];

        Thread::create($data); 

        return redirect('/');
    }

    public function destroy($id)
    {
        $thread = Thread::findOrFail($id);

        if($thread['user_id'] === auth()->id()) {
            try {
                unlink(public_path('uploads/'.$thread['img_url']));
                $thread->delete();
            } catch(Exception $e) {
                $thread->delete();
            }
        }

        return back();
    }
}
