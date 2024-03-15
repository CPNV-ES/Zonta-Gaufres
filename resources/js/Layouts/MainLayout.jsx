import React from 'react'
import Navbar from '@/Components/Navbar'
const MainLayout = ({ children }) => {
    return (
        <>
            <Navbar />
            <div className='h-full rounded-xl w-full border-2 border-gray-300 shadow-offset overflow-auto'>
                {children}
            </div>
        </>
    )
}

export default MainLayout