const DeliveryItem = ({ time, orders, city }) => {
    return (
        <>
            <div className="m-2 flex w-1/4 cursor-pointer flex-row overflow-hidden rounded bg-gray-200 hover:shadow">
                <div className="flex border-r-2 border-black p-3">
                    <span>{time}</span>
                </div>
                <div className="flex flex-1 p-3">
                    <span className="material-symbols-outlined">quick_reorder</span>
                    <span className="text-nowrap">
                            <span className="font-bold">{orders}</span> paquets
                        </span>
                </div>
                <div className="flex flex-1 p-3 max-w-40">
                    <span className="material-symbols-outlined">location_on</span>
                    <span className="truncate">{city}</span>
                </div>
            </div>
        </>)
}

export default DeliveryItem
