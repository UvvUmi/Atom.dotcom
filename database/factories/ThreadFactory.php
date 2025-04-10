<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;
use League\CommonMark\Util\UrlEncoder;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Thread>
 */
class ThreadFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $id = strval(rand(50, 200));
        $themeId = strval(rand(0, 3));
        return [
            'title' => $this->faker->state,
            'content' => $this->faker->words(rand(5, 30), true),
            'user_id' => User::inRandomOrder()->first()->id ?? 1,
            'img_url' => "https://picsum.photos/".$id."/100",
            'themeId' => $themeId,
        ];
    }
}
