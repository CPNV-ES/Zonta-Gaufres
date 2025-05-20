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
        if (!($backup->store($destinationPath, $request->input("backupPath")))) {
            return response()->json([
                'errors' => ["backupPath" => "Le chemin de sauvegarde spécifié n'existe pas ou n'est pas un répertoire valide."]
            ], 422);
        }
        return response()->json([
            'success' => "La sauvegarde a été effectuée avec succès dans : " . $destinationPath
        ]);
    }
    public function restore()
    {
        $filePath = $_GET["path"];

        $backup = new Backup();
        if (!($backup->restore($filePath))) {
            return response()->json([
                'errors' => ["backupPath" => "Le fichier spécifié n'existe pas ou n'est pas un fichier SQLite valide."]
            ], 422);
        }
        return response()->json([
            'success' => "La restauration a été effectuée avec succès avec le fichier : " . $filePath
        ]);
    }
}
