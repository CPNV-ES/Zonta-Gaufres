<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\DeliveryGuySchedule;
use Illuminate\Http\Request;
use Inertia\Inertia;


class DeliveryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $orderWithDeliveryGuySchedule = Order::with(
            ['deliveryGuySchedule.person', 'buyer', 'articles', 'address.city']
        )->get();

        $deliveries = [];

        foreach ($orderWithDeliveryGuySchedule as $order) {
            $personId = $order->deliveryGuySchedule->person->id;
            $tripCountByDeliveryGuy = DeliveryGuySchedule::where('person_id', $personId)->count();

            $quantity = $order->articles[0]->pivot->quantity;
            $gaufresPerPackage = 5;
            $numberOfPackages = ceil($quantity / $gaufresPerPackage);

            $address = $order->address[0];

            $delivery = [
                'delivery_id' => $order->delivery_guy_schedule_id,
                'delivery_guy' => $order->deliveryGuySchedule->person->firstname . ' ' . $order->deliveryGuySchedule->person->lastname,
                'delivery_count' => $numberOfPackages,
                'trip_count' => $tripCountByDeliveryGuy,
                'address' => $address->street . ' ' . $address->street_number,
                'postal_code' => $address->city->zip_code,
                'locality' => $address->city->name,
                'phone_number' => $order->buyer->phone_number,
            ];

            $deliveries[] = $delivery;
        }

        return Inertia::render(
            'Deliveries',
            ['deliveries' => $deliveries]
        );
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }


    private function formatOrders()
    {
        $orders = Order::with('address.city', 'articles', 'buyer', 'deliveryGuySchedule.person')->get();
        $formattedOrders = [];
        $deliveryGuys = $this->formatDeliveryGuys();

        foreach ($orders as $order) {
            if ($order->address->count() > 0){
                $deliveryGuyId = $order->deliveryGuySchedule ? $order->deliveryGuySchedule->id : null;
                $address = [
                    'streetNumber' => $order->address[0]->street_number,
                    'city' => $order->address[0]->city->name,
                    'postalCode' => $order->address[0]->city->zip_code,
                    'street' => $order->address[0]->street,
                ];

            } else {
                $deliveryGuyId = null;
                $address = [
                    'streetNumber' => null,
                    'city' => null,
                    'postalCode' => null,
                    'street' => null,
                ];
            }

            $deliveryGuy = array_filter($deliveryGuys, function ($deliveryGuy) use ($deliveryGuyId) {
                return $deliveryGuy['id'] === $deliveryGuyId;
            });

            $deliveryGuy = reset($deliveryGuy);

            $order = [
                'id' => $order->id,
                'address' => $address,
                'buyer' => $order->buyer->firstname . ' ' . $order->buyer->lastname,
                'quantity' => $order->articles[0]->pivot->quantity,
                'deliveryGuy' => $deliveryGuy,
                'endDelivery' => (new \DateTime($order->end_delivery_time))->format('H:i'),
                'startDelivery' => (new \DateTime($order->start_delivery_time))->format('H:i'),
                'realDelivery' => $order->real_delivery_time ? (new \DateTime($order->real_delivery_time))->format('H:i') : null,
                'enterprise' => $order->enterprise,
            ];

            array_push($formattedOrders, $order);
        }

        return $formattedOrders;
    }

    private function formatDeliveryGuys()
    {
        $deliveryGuys = DeliveryGuySchedule::with('person', 'city')->get();
        $formattedDeliveryGuys = [];

        foreach ($deliveryGuys as $deliveryGuy) {
            $deliveryGuy = [
                'id' => $deliveryGuy->id,
                'name' => $deliveryGuy->person->firstname,
                'surname' => $deliveryGuy->person->lastname,
                'city' => $deliveryGuy->city[0]->name,
                'orders' => 30,
                'trips' => 5,
                'timetable' => array_fill(0, 12, ['available' => true]),
            ];

            array_push($formattedDeliveryGuys, $deliveryGuy);
        }

        return $formattedDeliveryGuys;
    }

    /**
     * Show the form for editing the specified resource.
     */

    public function editAll()
    {
        $formattedOrders = $this->formatOrders();

        $orders = array_values(array_filter($formattedOrders, function ($order) {
            return $order['realDelivery'] === null;
        }));

        $deliveries = array_values(array_filter($formattedOrders, function ($order) {
            return $order['realDelivery'] !== null;
        }));

        return Inertia::render('DeliveriesEdit', [
            'initOrders' => $orders,
            'initDeliveries' => $deliveries,
            'deliveryGuys' => $this->formatDeliveryGuys(),
        ]);
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