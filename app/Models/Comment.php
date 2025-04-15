<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Comment extends Model
{
    use SoftDeletes, HasFactory;

    protected $fillable = ['comment', 'thread_id', 'user_id', 'img_url', 'img_name'];
    
    protected $dates = ['deleted_at'];

    public function thread()
    {
        return $this->belongsTo(Thread::class);
    }

    public function user()
    {
        return $this->belongTo(User::class);
    }
    
}
