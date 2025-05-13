<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Inertia\Inertia;
use Illuminate\Http\Request;


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
        //TODO

        return redirect()->route('orders.index');
    }
}
