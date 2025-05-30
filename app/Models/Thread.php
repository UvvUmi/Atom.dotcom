<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Thread extends Model
{
    use SoftDeletes, HasFactory;

    protected $fillable = ['title', 'content', 'user_id', 'img_url', 'img_name', 'themeId'];

    protected $dates = ['deleted_at'];

    public function user() 
    {
        return $this->belongsTo(User::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
}
