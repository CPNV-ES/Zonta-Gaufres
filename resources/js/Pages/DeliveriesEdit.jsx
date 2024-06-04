import React, { useState, useEffect } from 'react'
import { router } from '@inertiajs/react'
import MainLayout from '../Layouts/MainLayout'
import DeliveryguysCard from '@/Components/DeliveryguysCard.jsx'
import DeliveryguysBigCard from '@/Components/DeliveryguysBigCard.jsx'
import OrderCard from '@/Components/OrderCard'
import DeliveryItem from '@/Components/DeliveryItem.jsx'
import Draggable from '@/Components/Draggable.jsx'
import Dialog from '@/Components/Dialog.jsx'
import TimePicker from '@/Components/TimePicker'

const Deliveries = ({ initOrders = [], initDeliveries = [], deliveryGuys = [] }) => {

    const subject = 'Livraisons'
    const color = 'blue'

    const [deliveries, setDeliveries] = useState(initDeliveries)
    const [orders, setOrders] = useState(initOrders) // orders without delivery guy
    const [isDialogOpened, setIsDialogOpened] = useState(false)
    const [isDragging, setIsDragging] = useState(false)

    const [selectedDeliveryGuy, setSelectedDeliveryGuy] = useState(deliveryGuys[0])
    const [selectedDeliveryGuyDeliveries, setSelectedDeliveryGuyDeliveries] = useState([])
    const [draggedOrder, setDraggedOrder] = useState(null)
    const [choosenTime, setChoosenTime] = useState('09:00')

    const drop = () => {
        setIsDialogOpened(true)
        setIsDragging(false)
    }

    const linkOrderToPerson = (time) => {
        setIsDialogOpened(false)
        draggedOrder.realDelivery = time
        draggedOrder.deliveryGuy = selectedDeliveryGuy

        let updatedFields = {
            delivery_guy_schedule_id: selectedDeliveryGuy.id,
            real_delivery_time: `${time}:00`
        }

        router.put(`/orders/${draggedOrder.id}`, updatedFields)
    
        // send draggedOrder and selectedDeliveryGuy to the controller
        // wait the 200 status
        
        setDeliveries([...deliveries, draggedOrder])
        setOrders(orders.filter(order => order !== draggedOrder))
        setDraggedOrder(null)
    }

    useEffect(() => {
        orders.sort((a, b) => a.address.city.localeCompare(b.address.city))
    }, [orders])

    useEffect(() => {
        deliveries.sort((a, b) => a.realDelivery.localeCompare(b.realDelivery))
    }, [deliveries])

    useEffect(() => {
        setSelectedDeliveryGuyDeliveries(deliveries.filter(delivery => delivery.deliveryGuy.id === selectedDeliveryGuy.id))
    }, [selectedDeliveryGuy, deliveries])

    return (
        <MainLayout color={color} subject={subject}>
            <Dialog
                action={() => linkOrderToPerson(choosenTime)}
                onClose={() => setIsDragging(false)}
                title="Heure de livraison"
                description="Choisissez une heure de livraison pour cette commande"
                buttonLabel="Valider"
                setIsOpen={setIsDialogOpened}
                isOpen={isDialogOpened}
            >
                <TimePicker time={choosenTime} setTime={setChoosenTime} onValidate={() => linkOrderToPerson(choosenTime)}></TimePicker>
            </Dialog>
            <div className='flex h-full gap-4 p-4'>
                <section className='flex flex-col flex-1 h-full gap-4 p-4 border-2 rounded-lg bg-slate-200'>
                    <h1 className='text-xl font-semibold text-gray-500'>Livreurs</h1>
                    <div className='flex flex-col flex-1 gap-4 pr-2 overflow-y-auto'>

                        {deliveryGuys.map((person, index) => {
                            return <DeliveryguysCard onClick={() => setSelectedDeliveryGuy(person)} key={index} {...person} />
                        })}

                    </div>
                </section>
                <section className='flex flex-col flex-1 h-full gap-4 p-4 border-2 rounded-lg bg-slate-200'>
                    {selectedDeliveryGuy ? <DeliveryguysBigCard {...selectedDeliveryGuy} /> : null}
                    <div onDrop={() => drop()} onDragOver={(event) => event.preventDefault()} className={`flex flex-col flex-1 gap-4 px-2 overflow-y-auto outline-2 outline-gray-400 drop-area ${isDragging ? "outline" : null}`}>

                        <div className='relative flex items-center justify-center text-gray-500 border-gray-300 pointer-events-none border-b-1'>
                            <i className='absolute left-0 w-full h-[2px] bg-gray-300' />
                            <span className='z-10 px-4 bg-slate-200'>8:00</span>
                        </div>

                        {selectedDeliveryGuyDeliveries.map((delivery, index) => {
                            return <DeliveryItem key={index} {...delivery} />
                        })}
                    </div>
                </section>
                <section className='flex flex-col flex-1 h-full gap-4 p-4 border-2 rounded-lg bg-slate-200'>
                    <h1 className='text-xl font-semibold text-gray-500'>Commandes</h1>
                    <div className='flex flex-col flex-1 gap-4 pr-2 overflow-y-auto transition-all duration-500'>

                        {orders.map((order, index) => {
                            return (
                                <Draggable key={index} onDragStart={() => { setDraggedOrder(order), setIsDragging(true) }} onDragEnd={() => setIsDragging(false)}> {/* TODO, send the ID of the object to manage it from the controller */}
                                    <OrderCard {...order}>
                                    </OrderCard>
                                </Draggable>
                            )
                        })}

                    </div>
                </section>
            </div>
        </MainLayout>
    )
}

export default Deliveries