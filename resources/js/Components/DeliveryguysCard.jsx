import React from 'react';

const DeliveryguysCard = ({
                              name,
                              city,
                              orders,
                              trips,
                              timetable = Array.from({length: 12}, () => ({available: true})) // Simplified timetable generation
                          }) => {
    return (
        <>
            <div
                className="group min-w-72 shadow-md pl-2 pr-2 m-2 flex flex-col justify-between h-28 w-1/3 bg-white rounded overflow-hidden">
                <div>
                    <div
                        className="hours-container flex w-full gap-2 transition-transform transform -translate-y-3/4 group-hover:translate-y-0 duration-500">
                        {timetable.map((day, index) => {
                            return (
                                <span
                                    key={index}
                                    className={`flex-1 rounded-b text-center pb-1 ${day.available ? 'bg-green-300' : 'bg-red-300'}`}
                                >
                                {index + 1}
                            </span>
                            );
                        })}
                    </div>
                    <h1 className="ml-3 mt-2 text-2xl">{name}</h1>
                </div>
                <div className="flex justify-between mb-2 m-3">
                    <div className="flex gap-2 max-w-40">
                        <span className="material-symbols-outlined">location_on</span>
                        <span className="truncate">{city}</span>
                    </div>
                    <div className="flex flex-row gap-4">
                        <div className="flex gap-2">
                            <span className="material-symbols-outlined">quick_reorder</span>
                            <span>{orders}</span>
                        </div>
                        <div className="flex gap-2">
                            <span className="material-symbols-outlined">route</span>
                            <span>{trips}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default DeliveryguysCard;
