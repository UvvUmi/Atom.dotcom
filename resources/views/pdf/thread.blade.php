<!DOCTYPE html>
<html lang="lt">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $thread->title }}</title>
    <style>
        body { font-family: DejaVu Sans, sans-serif; }
        .header { text-align: center; font-size: 24px; font-weight: bold; }
        .content {font-size: 16px; text-align:center;}
        .comment_count {font-weight:bold;}
        .comments {}
    </style>
</head>
<body>
    <div class="pre-header">
        <p>{{ $thread->created_at }}</p>
        {{ $thread->user->name }}
        @if($thread->user->avatar_url === null)
            <img alt="" width="20px" height="20px" src="{{ public_path('uploads/avatars/null_avatar.png') }}"/>
        @else
            <img alt="" width="20px" height="20px" src="{{ public_path('uploads/avatars/'.$thread->user->avatar_url) }}"/>
        @endif 
        {{-- HTTP image links don't work in PDF!!! --}}
    </div>
    <div class="header">{{ $thread->title }}</div>
    <div class="content">
        @if (!$thread->is_local)
            {{ $thread->img_url }}
        @endif
        {{ $thread->img_name }}
        <br>
        <img alt="" src="{{ public_path('uploads/'.$thread->img_url) }}" width="400px" height="350px"/>
        <br>
        {{ $thread->content }}
    </div>
    <span class="comment_count">
        @if ($language === 'lt')
            Komentarai:
        @else
            Comments:
        @endif
    </span>{{ $comment_count }}
    <div class="comments">
        @foreach ($comments as $comment)
            {{ $comment->created_at }} {{ $comment->user_name }} 
            @if ($comment->avatar_link === null)
                <img alt="" src="{{ public_path('uploads/avatars/null_avatar.png') }}" width="20px" height="20px"/>
            @else
                <img alt="" src="{{ public_path('uploads/avatars/'.$comment->avatar_link) }}" width="20px" height="20px"/>
            @endif

            <br>

            @if ($comment->img_url != null)
                <img alt="" src="{{ public_path('uploads/comments/'.$comment->img_url) }}" width="200px" height="200px"/><br>
            @endif
            {{ $comment->comment }}

            <br><br>

        @endforeach
    </div>
</body>
</html>
