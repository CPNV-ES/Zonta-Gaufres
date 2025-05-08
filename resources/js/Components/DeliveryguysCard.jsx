import React from 'react';
import Timetable from './Timetable';

const DeliveryguysCard = ({ deliveryGuy, onClick, className="bg-white" }) => {
    return (
        <div onClick={onClick}
            className={`flex flex-col justify-between w-full pl-2 pr-2 rounded shadow-md cursor-pointer h-28 group min-w-72 ${className}`}>
            <div className='overflow-hidden'>
                <div
                    className="flex w-full gap-2 transition-transform duration-500 transform -translate-y-3/4 hours-container group-hover:translate-y-0">
                    <Timetable deliveries={deliveryGuy.orders_to_deliver} />
                </div>
                <h1 className="mt-2 ml-3 text-2xl truncate" title={`${deliveryGuy.email}`}>{deliveryGuy.email}</h1>
            </div>
            <div className="flex justify-between m-3 mb-2">
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