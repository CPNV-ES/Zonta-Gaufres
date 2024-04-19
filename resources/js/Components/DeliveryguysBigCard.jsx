import React from 'react';

const DeliveryguysBigCard = ({
                                 name,
                                 surname,
                                 city,
                                 postalCode,
                                 street,
                                 streetNumber,
                                 phone,
                                 orders,
                                 trips,
                                 timetable = Array.from({length: 12}, () => ({available: true})) // Simplified timetable generation
                             }) => {
    return (<>
    <div className="m-2 h-64 flex w-1/3 flex-col overflow-hidden rounded bg-white pr-2 pl-2 shadow-md group min-w-72">
        <div className="flex w-full gap-2 hours-container">
            {timetable.map((day, index) => {
                return (<span
                    key={index}
                    className={`flex-1 rounded-b text-center pb-1 ${day.available ? 'bg-green-300' : 'bg-red-300'}`}>{index + 1}</span>);
            })}
        </div>
        <div className="flex m-2">
            <div className="h-full w-1/2 flex flex-col items-center">
                <div className="h-32 w-32 bg-gray-300 rounded-full flex items-center justify-center text-white text-6xl">
                    <span>{`${name.charAt(0)}${surname.charAt(0)}`}</span>
                </div>
                <h1 className="text-2xl truncate mt-4">{name} {surname}</h1>
            </div>
            <div className="h-full w-1/2 flex flex-col justify-evenly  py-4">
                <div className="flex gap-2 items-center">
                    <span className="material-symbols-outlined">location_on</span>
                    <div className="flex flex-col flex-1 overflow-hidden">
                        <span className="truncate">{street} {streetNumber}</span>
                        <p className="truncate w-full">
                            {postalCode} <span className="font-bold">{city}</span>
                        </p>
                    </div>

                </div>
                <div className="flex gap-2">
                    <span className="material-symbols-outlined">quick_reorder</span>
                    <span>
                            <span className="font-bold">{orders}</span> paquets
                        </span>
                </div>
                <div className="flex gap-2">
                    <span className="material-symbols-outlined">route</span>
                    <span>
                        <span className="font-bold">{trips}</span> trajets
                    </span>
            </div>
            <div className="flex gap-2">
                <span className="material-symbols-outlined">phone</span>
                <span>{phone}</span>
            </div>
        </div>
    </div>
    </div>
</>)
};
export default DeliveryguysBigCard;
