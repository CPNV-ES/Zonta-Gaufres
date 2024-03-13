import React from 'react'
import NavIcon from './NavIcon'

const Navbar = () => {
    return (
        <nav className='h-full p-4 flex flex-col items-center justify-between  border-2 border-gray-300 rounded-xl shadow-offset'>
            <div className='w-10 flex flex-col gap-6'>
                <img className='w-10' src="./images/zonta.png" alt="Zonta"></img>
                <NavIcon name="Recherche" icon="[material-symbols--search-rounded]" />

                <hr className='w-full border border-gray-400'></hr>

                <NavIcon name="Commandes" icon="[material-symbols--article-outline]" />
                <NavIcon name="Livraisons" icon="[mdi--truck-outline]" />
                <NavIcon name="Personnel" icon="[ic--outline-people]" />
                <NavIcon name="Factures" icon="[gravity-ui--file-dollar]" />
            </div>

            <div className="w-10 flex flex-col gap-6">
                <NavIcon name="Paramètres" icon="[mdi--cog]" />
            </div>
        </nav>
    )
}

export default Navbar