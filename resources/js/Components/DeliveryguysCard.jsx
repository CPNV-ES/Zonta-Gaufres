import React from 'react';

const DeliveryguysCard = ({deliveryGuy, onClick}) => {
    return (
        <div onClick={onClick}
            className="flex flex-col justify-between w-full pl-2 pr-2 bg-white rounded shadow-md cursor-pointer h-28 group min-w-72">
            <div className='overflow-hidden'>
                <div
                    className="flex w-full gap-2 transition-transform duration-500 transform -translate-y-3/4 hours-container group-hover:translate-y-0">
                    {/* {timetable.map((day, index) => {
                        return (
                            <span
                                key={index}
                                className={`flex-1 rounded-b text-center pb-1 ${day.available ? 'bg-green-300' : 'bg-red-300'}`}
                            >
                                {index + 1}
                            </span>
                        );
                    })} */}
                </div>
                <h1 className="mt-2 ml-3 text-2xl truncate" title={`${deliveryGuy.person.firstname} ${deliveryGuy.person.lastname}`}>{deliveryGuy.person.firstname} {deliveryGuy.person.lastname}</h1>
            </div>
            <div className="flex justify-between m-3 mb-2">
                <div className="flex gap-2 max-w-40">
                    <span className="material-symbols-outlined">location_on</span>
                    <span className="truncate" title={deliveryGuy.city[0].name}>{deliveryGuy.city[0].name}</span>
                </div>
                <div className="flex flex-row gap-4">
                    <div className="flex gap-2">
                        <span className="material-symbols-outlined">quick_reorder</span>
                        <span>{0}</span>
                    </div>
                    <div className="flex gap-2">
                        <span className="material-symbols-outlined">route</span>
                        <span>{0}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default DeliveryguysCard;