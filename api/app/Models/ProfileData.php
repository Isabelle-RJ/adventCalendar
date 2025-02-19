<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;

/**
 * @property string $user_id
 * @property int $nb_calendars
 * @property int $nb_shared_calendars
 */

class ProfileData extends Model
{
    use HasApiTokens, HasUuids, HasFactory;

    protected $connection = 'mongodb';
    protected $collection = 'profile_data';

    protected $fillable = [
        'user_id',
        'nb_calendars',
        'nb_shared_calendars',
    ];
}
