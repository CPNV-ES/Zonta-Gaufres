const OrderCard = ({
                       street,
                       streetNumber,
                       postalCode,
                       city,
                       enterprise,
                       deliveryGuy,
                       orders,
                       startDelivery,
                       EndDelivery
                   }) => {
    return (
        <>
            <div className="rounded shadow w-1/3 m-2 p-2 flex flex-row justify-between">
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined">location_on</span>
                    <div className="flex flex-1 flex-col overflow-hidden">
                        <span>{enterprise}</span>
                        <span className="truncate">{street} {streetNumber}</span>
                        <p className="w-full truncate">
                            {postalCode} <span className="font-bold">{city}</span>
                        </p>
                    </div>
                </div>
                <div className="flex flex-col gap-2 pr-16 ">
                    <div className="flex gap-2">
                        <span className="material-symbols-outlined">quick_reorder</span>
                        <span>
                            <span className="font-bold">{orders}</span> paquets
                        </span>
                    </div>
                    <div className="flex gap-2">
                        <span className="material-symbols-outlined">person</span>
                        <span>{deliveryGuy}</span>
                    </div>
                    <div className="flex gap-2">
                        <span className="material-symbols-outlined">schedule</span>
                        <span>{startDelivery}</span>
                        <span className="material-symbols-outlined text-gray-400">arrow_forward</span>
                        <span>{EndDelivery}</span>
                    </div>
                </div>
            </div>
        </>
    )
}
export default OrderCard
