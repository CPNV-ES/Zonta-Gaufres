<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\OrderController;
use App\Models\Order;

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
    return redirect('/orders');
});

Route::get('/deliveries', function () {
    return Inertia::render('Deliveries');
});
Route::get('/people', function () {
    return Inertia::render('People');
});
Route::get('/invoices', function () {
    return Inertia::render('Invoices');
});

Route::resources([
    'orders' => OrderController::class,
]);
