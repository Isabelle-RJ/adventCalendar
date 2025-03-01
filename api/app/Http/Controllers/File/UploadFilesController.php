<?php

namespace App\Http\Controllers\File;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use App\Services\ImageOptimizerService;
use App\Requests\UploadFileFormRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Str;
use RuntimeException;
use Intervention\Image\Laravel\Facades\Image;

class UploadFilesController extends Controller
{
    public const DEFAULT_WIDTH = 1500;
    public const DEFAULT_QUALITY = 75;

    public function __invoke(UploadFileFormRequest $request): JsonResponse
    {
        $fileUuid = Str::uuid();
        if (!Storage::disk('public')->exists('uploads')) {
            Storage::disk('public')->makeDirectory('uploads');
            chmod(storage_path('/app/public/uploads'), 0777);
        }

        if (Storage::disk('public')->exists('uploads/' . $fileUuid . '-' . $request->file('file')->getClientOriginalName())) {

            throw new RuntimeException('File already exists');
        }

        $image = Image::read($request->file('file')->getPathname());
        $optimizerService = new ImageOptimizerService($image);

        $optimizerService->scale(self::DEFAULT_WIDTH);
        $optimizerService->encode(self::DEFAULT_QUALITY);

        $optimizerService->save(storage_path('/app/public/uploads/'  . $fileUuid . '-' . $request->file('file')->getClientOriginalName()));

        if (Storage::disk('public')->exists('uploads/'  . $fileUuid . '-' . $request->file('file')->getClientOriginalName())) {
            chmod(storage_path('/app/public/uploads/'  . $fileUuid . '-' . $request->file('file')->getClientOriginalName()), 0777);

            return response()->json([
                'message' => "L'image a bien été enregistrée",
                'path' => '/uploads/' . $fileUuid . '-' . $request->file('file')->getClientOriginalName(),
            ]);
        }

        throw new RuntimeException("L'image n'a pas pu être enregistrée");
    }
}
