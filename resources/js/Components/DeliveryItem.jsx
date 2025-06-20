const DeliveryItem = ({ delivery, unlink }) => {
    return (
        <>
            <div className="relative flex flex-row w-full bg-white rounded shadow-md">
                <div className="flex p-3 border-r-2 border-black">
                    <span>{delivery.real_delivery_time ? delivery.real_delivery_time.slice(0, 5) : "Erreur"}</span>
                </div>
                <div className="flex flex-1 p-3">
                    <span className="material-symbols-outlined">quick_reorder</span>
                    <span className="text-nowrap">
                        <span className="font-bold">{Math.ceil(delivery.waffle_quantity / 5)}</span> paquets
                    </span>
                </div>
                <div className="flex flex-1 p-3 max-w-40">
                    <span className="material-symbols-outlined">location_on</span>
                    <span className="truncate" title={delivery.address.city.name}>{delivery.address.city.name}</span>
                </div>
                <div className="absolute flex justify-end w-full h-full p-2 text-red-500 group">
                    <button onClick={unlink} className="hidden h-full px-2 bg-white group-hover:block">
                        <span className="h-full w-6 icon-[hugeicons--unlink-04]"></span>
                    </button>
                </div>
            </div>
        </>)
}

export default DeliveryItem
