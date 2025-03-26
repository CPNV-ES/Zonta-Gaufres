<?php

use App\Http\Controllers\OrderController;
use App\Http\Controllers\DeliveryController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PersonController;
use App\Http\Controllers\InvoiceController;
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

Route::get('/', function () {
    return redirect('/orders');
});

Route::get('/deliveries/edit', [DeliveryController::class, 'editAll']);

Route::get('/invoices', function () {
    return Inertia::render('Invoices');
});

Route::resource("invoices", InvoiceController::class)->only(["index", "update"]);
Route::get('/invoices/print', [InvoiceController::class, 'printInvoice']);
Route::resource("deliveries", DeliveryController::class)->only(["index", "editAll"]);
Route::get('/deliveries/print_labels', [DeliveryController::class, 'printLabels']);
Route::resource("orders", OrderController::class)->only(["index", "store", "create", "update"]);
Route::resource("people", PersonController::class)->only(["index", "store", "update"]);
