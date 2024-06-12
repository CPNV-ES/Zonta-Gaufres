import React from 'react';
import Timetable from './Timetable';

const DeliveryguysBigCard = ({ deliveryGuy }) => {
   
    return (<>
        <div className="flex flex-col w-full h-64 pl-2 pr-2 overflow-hidden bg-white rounded shadow-md group min-w-72">
            <Timetable deliveries={deliveryGuy.order}/>
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
