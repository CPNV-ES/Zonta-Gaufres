<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Inertia\Inertia;


class ParameterController extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;

    public function index()
    {
        return Inertia::render(
            'Parameters/Index'
        );
    }
    public function store()
    {
        //TODO
    }
    public function restore()
    {
        //TODO
    }
}
