<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property string $id
 * @property string $theme_name
 * @property string $image
 */
class Theme extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'theme_name',
        'image',
    ];

    public function calendars(): HasMany
    {
        return $this->hasMany(Calendar::class);
    }
}
