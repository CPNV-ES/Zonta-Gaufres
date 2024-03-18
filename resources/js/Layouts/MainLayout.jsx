import React from 'react'
import Navbar from '@/Components/Navbar'
const MainLayout = ({ children }) => {
    return (
        <section id="main-layout">
            <Navbar />
            <section className='h-full rounded-xl w-full border-2 border-gray-300 shadow-offset overflow-auto'>
                {children}
            </section>
        </section>
    )
}

export default MainLayout