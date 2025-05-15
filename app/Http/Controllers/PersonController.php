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
                return $type->enum()->toArray();
            });

            return [
                'id' => $person->id,
                'firstname' => $person->firstname,
                'lastname' => $person->lastname,
                'fullname' => $person->fullname,
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
            'firstname' => 'nullable',
            'lastname' => 'nullable',
            'company' => 'nullable',
            'email' => 'nullable|email',
            'phone_number' => 'nullable',
            'types' => 'required|array|min:1',
        ]);
        DB::transaction(function () use ($request) {
            $person = Person::create($request->all());

            foreach ($request->types as $type) {
                $person->personType()->attach(PersonType::fromEnum(PersonTypesEnum::fromCase($type))->first());
            }
        });
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'firstname' => 'nullable',
            'lastname' => 'nullable',
            'email' => 'email',
            'company' => 'nullable',
            'phone_number' => 'nullable',
        ]);

        DB::transaction(function () use ($request, $id) {
            $person = Person::findOrFail($id);
            $person->update($request->all());

            $person->personType()->detach();
            foreach ($request->types as $type) {
                $person->personType()->attach(PersonType::fromEnum(PersonTypesEnum::fromCase($type))->first());
            }
        });
    }

    public function printDeliverySheet(Request $request)
    {
        $people = Person::findMany(explode(',', $request->query('sheets')));
        return $people->generateSheetPDF()->download('delivery_sheet.pdf');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $person = Person::findOrFail($id);
        $person->delete();
    }
}
