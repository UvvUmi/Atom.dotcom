<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Route;

// Route::get('/', function () {
//     // return Inertia::render('Welcome', [
//     //     'canLogin' => Route::has('login'),
//     //     'canRegister' => Route::has('register'),
//     //     'laravelVersion' => Application::VERSION,
//     //     'phpVersion' => PHP_VERSION,
//     // ]);
//     return redirect('dashboard');
// });
Route::get('/', [DashboardController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::post('/post', [DashboardController::class, 'store'])->name('post');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');


    Route::get('/thread/{id}', [PostController::class, 'show'])->name('thread');
    Route::post('/thread/{id}/post_comment', [PostController::class, 'makeComment']);
    Route::patch('/update_comment/{comment_id}', [PostController::class, 'updateComment'])->name('comment.update');
    Route::delete('/destroy_comment/{comment_id}', [PostController::class, 'destroyComment']);
    Route::delete('/thread/{id}/destroy_thread', [PostController::class, 'destroyThread']);
    Route::delete('/destroy/{id}', [DashboardController::class, 'destroy']);

    Route::get('/thread/{id}/pdf/{lang}', [PostController::class, 'generatePDF']);

    Route::get('/profile/{id}', [ProfileController::class, 'show'])->name('profile.show');

    Route::post('/avatar/post', [ProfileController::class, 'postAvatar'])->name('avatar.post');

   
});

require __DIR__.'/auth.php';
