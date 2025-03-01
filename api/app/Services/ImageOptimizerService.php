<?php

namespace App\Services;

use Intervention\Image\Interfaces\EncodedImageInterface;
use Intervention\Image\Interfaces\ImageInterface;

class ImageOptimizerService
{
    public function __construct(private readonly ImageInterface $image) {}

    public function save(string $filePath): void
    {
        $this->image->save($filePath);
    }

    public function scale(int|null $width = null, int|null $height = null): ImageInterface
    {
        return $this->image->scale($width, $height);
    }

    public function encode(int|null $quality = null): EncodedImageInterface
    {
        return $this->image->encodeByMediaType(quality: $quality);
    }
}
