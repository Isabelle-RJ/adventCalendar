<?php

namespace App\Http\Controllers\File;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use App\Services\ImageOptimizerService;
use RuntimeException;
use Intervention\Image\Laravel\Facades\Image;
use App\Requests\GetFileFormRequest;
use Illuminate\Http\Response;
use Illuminate\Routing\ResponseFactory;
use Symfony\Component\HttpFoundation\BinaryFileResponse;


class GetFileController extends Controller
{
    public const DEFAULT_WIDTH = 1500;
    public const DEFAULT_QUALITY = 75;

    public function __invoke(GetFileFormRequest $request): ResponseFactory|Response|BinaryFileResponse
    {
        if (!Storage::disk('public')->exists($request->path)) {
            throw new RuntimeException('File not found', 404);
        }

        $path = Storage::disk('public')->path($request->path);
        $extension = pathinfo($path, PATHINFO_EXTENSION);
        $image = Image::read($path);

        $imageOptimizeService = new ImageOptimizerService($image);
        $imageOptimizeService->scale($request->width ?? self::DEFAULT_WIDTH);


        return response($imageOptimizeService->encode($request->quality ?? self::DEFAULT_QUALITY))->header('Content-Type', 'image/' . $extension);
    }
}
