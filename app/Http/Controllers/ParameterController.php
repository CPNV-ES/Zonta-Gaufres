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
        return Inertia::render(
            'Parameters/Index'
        );
    }
    public function store(Request $request)
    {
        copy("./database/database.sqlite", $request->input("backupPath") . "/database" . date("Y-m-d-H-i-s") . ".sqlite");
    }
    public function restore()
    {
        //TODO

        return redirect()->route('orders.index');
    }
}
