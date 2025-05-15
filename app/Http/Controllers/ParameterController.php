<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Inertia\Inertia;
use Illuminate\Http\Request;

//TODO : Take care of the problem of double redirection on store method
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

        // Check if the backupPath exists and is a directory
        if (!is_dir($request->input("backupPath"))) {
            return redirect()
                ->back()
                ->withErrors(["backupPath" => "Le chemin de sauvegarde spécifié n'existe pas ou n'est pas un répertoire valide."]);
        }

        // Perform the backup operation
        try {
            copy(base_path("database/database.sqlite"), $destinationPath);
        } catch (\Exception $e) {
            return redirect()
                ->route('parameters.index')
                ->withErrors(["backupPath" => "Une erreur s'est produite lors de la sauvegarde : " . $e->getMessage()]);
        }

        redirect()
            ->route('parameters.index')
            ->with("success", "La sauvegarde a été effectuée avec succès dans : " . $destinationPath);
    }
    public function restore()
    {
        $filePath = $_GET["path"];

        // Check if the given file exists and contains ".sqlite" in its name
        if (!file_exists($filePath) || !str_contains($filePath, '.sqlite')) {
            return redirect()
                ->back()
                ->withErrors(["backupPath" => "Le fichier spécifié n'existe pas ou n'est pas un fichier SQLite valide."]);
        }

        try {
            // Copy the specified file to replace the current database
            copy($filePath, base_path("database/database.sqlite"));
        } catch (\Exception $e) {
            return redirect()
                ->back()
                ->withErrors(["backupPath" => "Une erreur s'est produite lors de la restauration : " . $e->getMessage()]);
        }

        // Redirect back to parameters with a success message
        return redirect()
            ->route('parameters.index')
            ->with("success", "La restauration a été effectuée avec succès avec le fichier : " . $filePath);
    }
}
