<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Backup;

class ParameterController extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;

    public function index()
    {
        return Inertia::render('Parameters/Index', [
            'success' => session('success'),
            'errors' => session('errors') ? session('errors')->getBag('default')->getMessages() : null,
        ]);
    }
    public function store(Request $request)
    {
        $backupFileName = "backup" . date("Y-m-d-H-i-s") . ".sqlite";
        $destinationPath = $request->input("backupPath") . DIRECTORY_SEPARATOR . $backupFileName;

        $backup = new Backup();
        $backup->store($destinationPath, $request->input("backupPath"));
    }
    public function restore()
    {
        $filePath = $_GET["path"];

        $backup = new Backup();
        return $backup->restore($filePath);
    }
}
