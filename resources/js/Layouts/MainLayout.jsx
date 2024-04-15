import React from 'react'
import Navbar from '@/Components/Navbar'
const MainLayout = ({ children, color='gray' }) => {
    return (
        <section id="main-layout" className={`bg-${color}-200`}>
            <Navbar />
            <section className='h-full rounded-xl w-full border-2 border-gray-300 shadow-offset overflow-auto bg-gray-50'>
                {children}
            </section>
        </section>
    )
}

export default MainLayout
