const DeliveryItem = ({ deliveryHour, order }) => {
    return (
        <>
            <div className="flex flex-row w-full bg-white rounded shadow-md cursor-pointer hover:shadow">
                <div className="flex p-3 border-r-2 border-black">
                    <span>{deliveryHour}</span>
                </div>
                <div className="flex flex-1 p-3">
                    <span className="material-symbols-outlined">quick_reorder</span>
                    <span className="text-nowrap">
                        <span className="font-bold">{order.orders}</span> paquets
                    </span>
                </div>
                <div className="flex flex-1 p-3 max-w-40">
                    <span className="material-symbols-outlined">location_on</span>
                    <span className="truncate" title={order.address.city}>{order.address.city}</span>
                </div>
            </div>
        </>)
}

export default DeliveryItem