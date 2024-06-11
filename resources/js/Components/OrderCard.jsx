const OrderCard = ({ order }) => {
    if (!order.buyer)
        return <></>
    return (
        <div className="flex flex-row justify-between w-full p-2 bg-white rounded shadow-md">
            <div className="flex items-center gap-2">
                <span className="material-symbols-outlined">location_on</span>
                <div className="flex flex-col flex-1 overflow-hidden">
                    <span>{order.buyer.company}</span>
                    <span className="truncate">{order.address[0].street} {order.address[0].streetNumber}</span>
                    <p className="w-full truncate">
                        {order.address[0].city.zip_code} <span className="font-bold">{order.address[0].city.name}</span>
                    </p>
                </div>
            </div>
            <div className="flex flex-col gap-2 pr-16 ">
                <div className="flex gap-2">
                    <span className="material-symbols-outlined">quick_reorder</span>
                    <span>
                        <span className="font-bold">{order.articles[0].pivot.quantity}</span> paquets
                    </span>
                </div>
                <div className="flex gap-2">
                    <span className="material-symbols-outlined">person</span>
                    <span>{order.buyer.firstname} {order.buyer.lastname}</span>
                </div>
                <div className="flex gap-2">
                    <span className="material-symbols-outlined">schedule</span>
                    <span>{order.start_delivery_time}</span>
                    <span className="text-gray-400 material-symbols-outlined">arrow_forward</span>
                    <span>{order.end_delivery_time}</span>
                </div>
            </div>
        </div>
    )
}
export default OrderCard
