import React from 'react'
import MainLayout from '../Layouts/MainLayout'
import DeliveryguysCard from '@/Components/DeliveryguysCard.jsx'
import DeliveryguysBigCard from '@/Components/DeliveryguysBigCard.jsx'
import OrderCard from '@/Components/OrderCard'
import DeliveryItem from '@/Components/DeliveryItem.jsx'

const Deliveries = () => {
    const subject = 'Livraisons'
    const color = 'blue'

    return (
        <MainLayout color={color} subject={subject}>
            <div className='flex h-full gap-4 p-4'>
                <section className='flex flex-col flex-1 h-full gap-4 p-4 border-2 rounded-lg bg-slate-200'>
                    <h1 className='text-xl font-semibold text-gray-500'>Livreurs</h1>
                    <div className='flex flex-col flex-1 gap-4 pr-2 overflow-y-auto'>

                    </div>
                </section>
                <section className='flex flex-col flex-1 h-full gap-4 p-4 border-2 rounded-lg bg-slate-200'>
                   
                    <div className='flex flex-col flex-1 gap-4 pr-2 overflow-y-auto'>
                        <div className='relative flex items-center justify-center text-gray-500 border-gray-300 border-b-1'>
                            <i className='absolute left-0 w-full h-[2px] bg-gray-300' />
                            <span className='z-10 px-4 bg-slate-200'>8:00</span>
                        </div>
                    </div>
                    
                </section>
                <section className='flex flex-col flex-1 h-full gap-4 p-4 border-2 rounded-lg bg-slate-200'>
                    <h1 className='text-xl font-semibold text-gray-500'>Commandes</h1>
                    <div className='flex flex-col flex-1 gap-4 pr-2 overflow-y-auto'>

                    </div>
                </section>
            </div>
        </MainLayout>
    )
}

export default Deliveries
