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
                return PersonTypesEnum::fromCase($type->name)->toArray();
            });

            return [
                'id' => $person->id,
                'firstname' => $person->firstname,
                'lastname' => $person->lastname,
                'email' => $person->email,
                'phone_number' => $person->phone_number,
                'company' => $person->company,
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
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'firstname' => 'required',
            'lastname' => 'required',
            'company' => 'nullable',
            'email' => 'nullable|email',
            'phone_number' => 'required',
            'roles' => 'required|array|min:1',
        ]);
        DB::transaction(function () use ($request) {
            $person = Person::create($request->all());

            foreach ($request->roles as $type) {
                $person->personType()->attach(PersonType::where('name', PersonTypesEnum::from($type)->name)->first());
            }
        });
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'firstname' => 'required',
            'lastname' => 'required',
            'email' => 'nullable|email',
            'company' => 'nullable',
            'phone_number' => 'required',
        ]);

        DB::transaction(function () use ($request, $id) {
            $person = Person::findOrFail($id);
            $person->update($request->all());

            $person->personType()->detach();
            foreach ($request->roles as $type) {
                $person->personType()->attach(PersonType::where('name', PersonTypesEnum::from($type)->name)->first());
            }
        });
    }
}
