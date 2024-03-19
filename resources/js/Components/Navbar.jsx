import React, { useState, useEffect } from 'react'
import NavIcon from './NavIcon'

const Navbar = ({color}) => {

    const [opened, setOpened] = useState(false)
    const [maxNavWidth, setMaxNavWidth] = useState(40)

    useEffect(() => {
        if (!opened) return setMaxNavWidth(40)

        // Get the width of the widest nav label
        let navLabels = Array.from(document.getElementsByClassName('nav-label'))
        navLabels = navLabels.map((label) => label.offsetWidth)
        setMaxNavWidth(Math.max(...navLabels))
    }, [opened])

    return (
        <nav className={`main-layout-section relative p-4 flex flex-col justify-between border-${color}-400`}>

            <button 
            className="absolute translate-x-1/2 rounded-full right-0 h-6 w-6 flex justify-center items-center border-2 border-gray-300 shadow-offset bg-white hover:bg-gray-200"
            onClick={() => setOpened(!opened)}
            >
                <span className='transition-all ease-in-out duration-700 icon-[mdi--chevron-right]' style={{rotate:`${-180*opened}deg`}}>&gt;</span>
            </button>

            <div className='transition-all ease-in-out duration-700 flex flex-col items-start justify-start gap-6 overflow-hidden' style={{maxWidth:`${maxNavWidth}px`}}>
                <img className='w-10' src="./images/zonta.png" alt="Zonta"></img>
                <NavIcon name="Recherche" icon="[material-symbols--search-rounded]"/>
                <hr className='w-full rotate-[2] border border-gray-400'></hr>
                <NavIcon selected name="Commandes" icon="[material-symbols--article-outline]" color='green'/>
                <NavIcon name="Livraisons" icon="[mdi--truck-outline]" color='blue'/>
                <NavIcon name="Personnel" icon="[ic--outline-people]" color='yellow'/>
                <NavIcon name="Factures" icon="[gravity-ui--file-dollar]" color='red'/>
            </div>

            <div className='transition-all ease-in-out duration-700 flex flex-col items-start justify-start gap-6 overflow-hidden' style={{maxWidth: `${maxNavWidth}px`}}>
                <NavIcon name="Paramètres" icon="[mdi--cog]" />
            </div>
        </nav>
    )
}

export default Navbar