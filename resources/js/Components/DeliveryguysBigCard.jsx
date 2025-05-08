import React from 'react';
import Timetable from './Timetable';

const DeliveryguysBigCard = ({ deliveryGuy }) => {
   
    return (<>
        <div className="flex flex-col w-full h-64 pl-2 pr-2 overflow-hidden bg-white rounded shadow-md group min-w-72">
            <Timetable deliveries={deliveryGuy.orders_to_deliver}/>
            <div className="flex m-2">
                <div className="flex flex-col h-full py-4 justify-evenly">
                <h1 className="mt-4 text-2xl truncate" title={`${deliveryGuy.email}`}>{deliveryGuy.email}</h1>
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
                        <span>{deliveryGuy.phone_number}</span>
                    </div>
                </div>
            </div>
        </div>
    </>)
};
export default DeliveryguysBigCard;
