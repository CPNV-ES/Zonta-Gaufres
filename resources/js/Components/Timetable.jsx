import React, { useState, useEffect } from 'react'

const Timetable = ({ deliveries, baseHour = 7 }) => {

    const TEMPLATE_TIMETABLE = [true, true, true, true, true, true, true, true, true, true, true, true]
    const [timetable, setTimetable] = useState(TEMPLATE_TIMETABLE)

    useEffect(() => {
        let newTimetable = TEMPLATE_TIMETABLE

        deliveries.map((order) => {
            if (order.real_delivery_time && newTimetable[parseInt(order.real_delivery_time.slice(0, 2)) - baseHour] == true)
                newTimetable[parseInt(order.real_delivery_time.slice(0, 2)) - baseHour] = false
        })
        setTimetable(newTimetable)
    }, [deliveries.map(order => order.real_delivery_time).join()])

    return (
        <div className="flex w-full gap-2 hours-container">
            {timetable.map((hour, index) => {
                return (<span
                    key={index}
                    className={`flex-1 rounded-b text-center pb-1 ${hour ? 'bg-green-300' : 'bg-red-300'}`}>{index + baseHour}</span>);
            })}
        </div>
    )
}

export default Timetable