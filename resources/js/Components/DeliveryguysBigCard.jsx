import React from 'react';

const DeliveryguysBigCard = ({name, surname, address, phone, orders, trips,
    timetable = Array.from({ length: 12 }, () => ({ available: true })) // Simplified timetable generation
}) => {
    return (<>
        <div className="flex flex-col w-full h-64 pl-2 pr-2 overflow-hidden bg-white rounded shadow-md group min-w-72">
            <div className="flex w-full gap-2 hours-container">
                {timetable.map((day, index) => {
                    return (<span
                        key={index}
                        className={`flex-1 rounded-b text-center pb-1 ${day.available ? 'bg-green-300' : 'bg-red-300'}`}>{index + 1}</span>);
                })}
            </div>
            <div className="flex m-2">
                <div className="flex flex-col items-center w-1/2 h-full">
                    <div className="flex items-center justify-center w-32 h-32 text-6xl text-white bg-gray-300 rounded-full">
                        <span>{`${name.charAt(0)}${surname.charAt(0)}`}</span>
                    </div>
                    <h1 className="mt-4 text-2xl truncate" title={`${name} ${surname}`}>{name} {surname}</h1>
                </div>
                <div className="flex flex-col w-1/2 h-full py-4 justify-evenly">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined">location_on</span>
                        <div className="flex flex-col flex-1 overflow-hidden">
                            <span className="truncate" title={`${address.street} ${address.streetNumber}`}>{address.street} {address.streetNumber}</span>
                            <p className="w-full truncate">
                                {address.postalCode} <span className="font-bold" title={address.city}>{address.city}</span>
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
