<?php

namespace App\Models;

use DateTimeImmutable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property string $id
 * @property int $number
 * @property string $gift
 * @property string $calendar_id
 * @property boolean $is_open
 * @property DateTimeImmutable opened_at
 */
class ItemCase extends Model
{
    use HasFactory;

    protected $table = 'items_cases';
    public $timestamps = false;

    protected $fillable = [
        'number',
        'gift',
        'calendar_id',
        'is_opened',
        'opened_at',
    ];

    public function calendar(): BelongsTo
    {
        return $this->belongsTo(Calendar::class);
    }
}
