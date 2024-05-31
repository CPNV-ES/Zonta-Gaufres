const OrderCard = ({ address, enterprise, buyer, quantity, startDelivery, endDelivery }) => {
    return (
        <div className="flex flex-row justify-between w-full p-2 bg-white rounded shadow-md">
            <div className="flex items-center gap-2">
                <span className="material-symbols-outlined">location_on</span>
                <div className="flex flex-col flex-1 overflow-hidden">
                    <span>{enterprise}</span>
                    <span className="truncate">{address.street} {address.streetNumber}</span>
                    <p className="w-full truncate">
                        {address.postalCode} <span className="font-bold">{address.city}</span>
                    </p>
                </div>
            </div>
            <div className="flex flex-col gap-2 pr-16 ">
                <div className="flex gap-2">
                    <span className="material-symbols-outlined">quick_reorder</span>
                    <span>
                        <span className="font-bold">{quantity}</span> paquets
                    </span>
                </div>
                <div className="flex gap-2">
                    <span className="material-symbols-outlined">person</span>
                    <span>{buyer}</span>
                </div>
                <div className="flex gap-2">
                    <span className="material-symbols-outlined">schedule</span>
                    <span>{startDelivery}</span>
                    <span className="text-gray-400 material-symbols-outlined">arrow_forward</span>
                    <span>{endDelivery}</span>
                </div>
            </div>
        </div>
    )
}
export default OrderCard
