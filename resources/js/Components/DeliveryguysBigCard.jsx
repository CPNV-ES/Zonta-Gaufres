import React, { useState, useEffect } from 'react';

const DeliveryguysBigCard = ({ deliveryGuy, baseHour = 7 }) => {
    const TEMPLATE_TIMETABLE = [true, true, true, true, true, true, true, true, true, true, true, true]
    const [timetable, setTimetable] = useState(TEMPLATE_TIMETABLE)

    useEffect(() => {
        let newTimetable = TEMPLATE_TIMETABLE

        deliveryGuy.order.map((order) => {
            if (order.real_delivery_time && newTimetable[parseInt(order.real_delivery_time.slice(0, 2)) - baseHour] == true)
                newTimetable[parseInt(order.real_delivery_time.slice(0, 2)) - baseHour] = false
        })
        setTimetable(newTimetable)
    }, [deliveryGuy])


    return (<>
        <div className="flex flex-col w-full h-64 pl-2 pr-2 overflow-hidden bg-white rounded shadow-md group min-w-72">
            <div className="flex w-full gap-2 hours-container">
                {timetable.map((hour, index) => {
                    return (<span
                        key={index}
                        className={`flex-1 rounded-b text-center pb-1 ${hour ? 'bg-green-300' : 'bg-red-300'}`}>{index + baseHour}</span>);
                })}
            </div>
            <div className="flex m-2">
                <div className="flex flex-col items-center w-1/2 h-full">
                    <div className="flex items-center justify-center w-32 h-32 text-6xl text-white bg-gray-300 rounded-full">
                        <span>{`${deliveryGuy.person.firstname.charAt(0)}${deliveryGuy.person.lastname.charAt(0)}`}</span>
                    </div>
                    <h1 className="mt-4 text-2xl truncate" title={`${deliveryGuy.person.firstname} ${deliveryGuy.person.lastname}`}>{deliveryGuy.person.firstname} {deliveryGuy.person.lastname}</h1>
                </div>
                <div className="flex flex-col w-1/2 h-full py-4 justify-evenly">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined">location_on</span>
                        <div className="flex flex-col flex-1 overflow-hidden">
                            <span className="w-full truncate">
                                {deliveryGuy.city[0].name}
                            </span>
                        </div>

                    </div>
                    <div className="flex gap-2">
                        <span className="material-symbols-outlined">quick_reorder</span>
                        <span>
                            <span className="font-bold">{0}</span> paquets
                        </span>
                    </div>
                    <div className="flex gap-2">
                        <span className="material-symbols-outlined">route</span>
                        <span>
                            <span className="font-bold">{0}</span> trajets
                        </span>
                    </div>
                    <div className="flex gap-2">
                        <span className="material-symbols-outlined">phone</span>
                        <span>{deliveryGuy.person.phone_number}</span>
                    </div>
                </div>
            </div>
        </div>
    </>)
};
export default DeliveryguysBigCard;
