import React from 'react'
import Navbar from '@/Components/Navbar'
const MainLayout = ({ children, color='gray' }) => {
    return (
        <section id="main-layout" className={`bg-${color}-200`}>
            <Navbar color={color} />
            <section className={`main-layout-section border-${color}-400 overflow-auto w-full`}>
                {children}
            </section>
        </section>
    )
}

export default MainLayout