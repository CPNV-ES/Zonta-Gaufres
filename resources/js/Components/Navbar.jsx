import React, { useState } from 'react'
import NavIcon from './NavIcon'

const Navbar = () => {

    const [opened, setOpened] = useState(false)

    return (
        <nav className='relative h-full p-4 flex flex-col items-center justify-between border-2 border-gray-300 rounded-xl shadow-offset'>

            <button 
            className="absolute translate-x-1/2 rounded-full right-0 h-6 w-6 flex justify-center items-center border-2 border-gray-300 shadow-offset bg-white hover:bg-gray-200"
            onClick={() => setOpened(!opened)}
            >
                <span className={`transition-all ease-in-out duration-500 rotate-${180*opened} icon-[mdi--chevron-right]`}></span>
            </button>

            <div className={`transition-all ease-in-out duration-700 ${opened ? 'max-w-screen-sm' : 'max-w-10'} flex flex-col gap-6 overflow-hidden`}>
                <img className='w-10' src="./images/zonta.png" alt="Zonta"></img>
                <NavIcon name="Recherche" icon="[material-symbols--search-rounded]" />

                <hr className='w-full rotate-[2] border border-gray-400'></hr>

                <NavIcon name="Commandes" icon="[material-symbols--article-outline]" />
                <NavIcon name="Livraisons" icon="[mdi--truck-outline]" />
                <NavIcon name="Personnel" icon="[ic--outline-people]" />
                <NavIcon name="Factures" icon="[gravity-ui--file-dollar]" />
            </div>

            <div className={`transition-all ease-in-out duration-700 ${opened ? 'max-w-screen-sm' : 'max-w-10'} w-full flex flex-col gap-6 overflow-hidden`}>
                <NavIcon name="Paramètres" icon="[mdi--cog]" />
            </div>
        </nav>
    )
}

export default Navbar