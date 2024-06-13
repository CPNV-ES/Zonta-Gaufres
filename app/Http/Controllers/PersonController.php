<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Person;
use Inertia\Inertia;
use App\Enums\PersonTypesEnum;
use App\Models\PersonType;
use Illuminate\Support\Facades\DB;

class PersonController extends Controller
{
    public function index()
    {
        $people = Person::with('personType')->get();

        $transformed = $people->map(function ($person) {
            $types = $person->personType->map(function ($type) {
                $case = PersonTypesEnum::fromCase($type->name);
                return [
                    "name" => $case->value,
                    "key" => $case->name,
                ];
            });

            return [
                'id' => $person->id,
                'firstname' => $person->firstname,
                'lastname' => $person->lastname,
                'email' => $person->email,
                'phone_number' => $person->phone_number,
                'types' => $types,
                'orders_count' => $person->orders->count(),
                'note' => $person->remark,
            ];
        });

        return Inertia::render('People/Index', [
            'people' => $transformed,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'firstname' => 'required',
            'lastname' => 'required',
            'email' => 'required|email',
            'phone_number' => 'required',
        ]);
        DB::transaction(function () use ($request) {
            $person = Person::create($request->all());

            foreach ($request->roles as $type) {
                $person->personType()->attach(PersonType::where('name', PersonTypesEnum::from($type)->name)->first());
            }
        });
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
