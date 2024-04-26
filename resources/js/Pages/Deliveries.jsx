import React from 'react'
import MainLayout from '../Layouts/MainLayout'
import DeliveryguysCard from '@/Components/DeliveryguysCard.jsx'
import DeliveryguysBigCard from '@/Components/DeliveryguysBigCard.jsx'
import DeliveryItem from '@/Components/DeliveryItem.jsx'

const Deliveries = () => {
    const subject = 'Livraisons'
    const color = 'blue'

    return (
        <MainLayout color={color} subject={subject}>
            <div className='flex h-full gap-4 p-4'>
                <section className='flex flex-col flex-1 h-full gap-4 p-4 border-2 rounded-lg bg-slate-200'></section>
                <section className='flex flex-col flex-1 h-full gap-4 p-4 border-2 rounded-lg bg-slate-200'></section>
                <section className='flex flex-col flex-1 h-full gap-4 p-4 border-2 rounded-lg bg-slate-200'></section>
            </div>
        </MainLayout>
    )
}

export default Deliveries
