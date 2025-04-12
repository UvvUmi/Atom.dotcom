<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Thread extends Model
{
    use SoftDeletes, HasFactory;

    protected $fillable = ['title', 'content', 'user_id', 'img_url', 'themeId'];

    protected $dates = ['deleted_at'];

    protected function name(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => url('uploads/'.$value),
        );
    }
    
    public function user() 
    {
        return $this->belongsTo(User::class);
    }
}
