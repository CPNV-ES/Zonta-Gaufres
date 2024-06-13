<?php

use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DeliveryController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PersonController;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// ! refactor to use controllers once implemented

Route::get('/', function () {
    return Inertia::render('Orders');
});

Route::get('/deliveries/edit', [DeliveryController::class, 'editAll']);

Route::get('/invoices', function () {
    return Inertia::render('Invoices');
});

Route::resources([
    'deliveries' => DeliveryController::class,
    'orders' => OrderController::class,
    'people' => PersonController::class,
]);
