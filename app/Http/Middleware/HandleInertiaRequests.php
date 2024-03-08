<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
<<<<<<< HEAD
     * The root template that is loaded on the first page visit.
     *
=======
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
>>>>>>> e6bf6b1e4c33468f7ed863828ccc1c8f70e696f7
     * @var string
     */
    protected $rootView = 'app';

    /**
<<<<<<< HEAD
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
=======
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    public function version(Request $request): ?string
>>>>>>> e6bf6b1e4c33468f7ed863828ccc1c8f70e696f7
    {
        return parent::version($request);
    }

    /**
<<<<<<< HEAD
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
        ];
=======
     * Defines the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
            //
        ]);
>>>>>>> e6bf6b1e4c33468f7ed863828ccc1c8f70e696f7
    }
}
