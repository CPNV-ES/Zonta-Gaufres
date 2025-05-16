<?php

namespace App\Models;



class Backup
{
    public function store($destinationPath, $directory)
    {
        if (!is_dir($directory)) {
            return redirect()
                ->back()
                ->withErrors(["backupPath" => "Le chemin de sauvegarde spécifié n'existe pas ou n'est pas un répertoire valide."]);
        }

        try {
            copy(base_path("database/database.sqlite"), $destinationPath);
        } catch (\Exception $e) {
            return redirect()
                ->route('parameters.index')
                ->withErrors(["backupPath" => "Une erreur s'est produite lors de la sauvegarde : " . $e->getMessage()]);
        }
        return redirect()
            ->route('parameters.index')
            ->with("success", "La sauvegarde a été effectuée avec succès dans : " . $destinationPath);
    }
    public function restore($filePath)
    {
        if (!file_exists($filePath) || !str_contains($filePath, '.sqlite')) {
            return redirect()
                ->back()
                ->withErrors(["backupPath" => "Le fichier spécifié n'existe pas ou n'est pas un fichier SQLite valide."]);
        }

        try {
            copy($filePath, base_path("database/database.sqlite"));
        } catch (\Exception $e) {
            return redirect()
                ->back()
                ->withErrors(["backupPath" => "Une erreur s'est produite lors de la restauration : " . $e->getMessage()]);
        }
        return redirect()
            ->route('parameters.index')
            ->with("success", "La restauration a été effectuée avec succès avec le fichier : " . $filePath);
    }
}
