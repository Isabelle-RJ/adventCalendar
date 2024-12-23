<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property string $id
 * @property string $user_id
 * @property string $theme_id
 * @property string $title
 * @property string $id_share
 */
class Calendar extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'id_share',
        'user_id',
        'theme_id',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function itemsCases(): HasMany
    {
        return $this->hasMany(ItemCase::class);
    }

    public function theme(): BelongsTo
    {
        return $this->belongsTo(Theme::class);
    }
}
