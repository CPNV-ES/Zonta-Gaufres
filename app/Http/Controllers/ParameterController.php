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
        // Check if the backupPath exists and is a directory
        if (!is_dir($request->input("backupPath"))) {
            return redirect()
                ->route('parameters.index')
                ->withErrors(["backupPath" => "Le chemin de sauvegarde spécifié n'existe pas ou n'est pas un répertoire valide."]);
        }

        // Perform the backup operation
        try {
            $backupFileName = "backup" . date("Y-m-d-H-i-s") . ".sqlite";
            $destinationPath = $request->input("backupPath") . DIRECTORY_SEPARATOR . $backupFileName;

            copy(base_path("database/database.sqlite"), $destinationPath);

            return redirect()
                ->route('parameters.index')
                ->with("success", "La sauvegarde a été effectuée avec succès dans : " . $destinationPath);
        } catch (\Exception $e) {
            return redirect()
                ->route('parameters.index')
                ->withErrors(["backupPath" => "Une erreur s'est produite lors de la sauvegarde : " . $e->getMessage()]);
        }
    }
    public function restore()
    {
        $backupPath = $_GET["path"];

        // Check if a file exists in the directory containing "backup" and ending with ".sqlite"
        $files = glob($backupPath . "\backup*.sqlite");

        if (empty($files)) {
            // No matching file found
            return redirect()
                ->back()
                ->withErrors(["backupPath" => "Aucun fichier valide n'a été trouvé dans le chemin spécifié."]);
        }

        //restore the file based of the most recent one
        usort($files, function ($a, $b) {
            return filemtime($b) - filemtime($a);
        });

        try {
            copy($files[0], base_path("database/database.sqlite"));
        } catch (\Exception $e) {
            return redirect()
                ->back()
                ->withErrors(["backupPath" => "Une erreur s'est produite lors de la restauration : " . $e->getMessage()]);
        }

        //redirect back to parameters with success message
        return redirect()
            ->route('parameters.index')
            ->with("success", "La restauration a été effectuée avec succès avec le fichier : " . $files[0]);
    }
}
