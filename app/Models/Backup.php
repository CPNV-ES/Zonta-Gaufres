<?php

namespace App\Models;



class Backup
{
    public function store($destinationPath, $directory)
    {
        if (!is_dir($directory)) {
            return false;
        }
        copy(base_path("database/database.sqlite"), $destinationPath);

        return true;
    }
    public function restore($filePath)
    {
        if (!file_exists($filePath) || !str_contains($filePath, '.sqlite')) {
            return false;
        }
        copy($filePath, base_path("database/database.sqlite"));

        return true;
    }
}
