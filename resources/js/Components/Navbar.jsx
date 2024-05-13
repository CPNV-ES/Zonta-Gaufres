import React, {useEffect, useState} from 'react'
import NavIcon from './NavIcon'
import Dialog from "@/Components/Dialog.jsx";
import Search from "@/Components/Search.jsx";

const Navbar = ({color, subject}) => {

    const [opened, setOpened] = useState(false)
    const [maxNavWidth, setMaxNavWidth] = useState(40)
    const [isDialogOpened, setIsDialogOpened] = useState(false)

    const NavIcons = [
        {name: "Commandes", icon: "[material-symbols--article-outline]", color: 'green', destination: '/orders'},
        {name: "Livraisons", icon: "[mdi--truck-outline]", color: 'blue', destination: '/deliveries'},
        {name: "Personnel", icon: "[ic--outline-people]", color: 'yellow', destination: '/people'},
        {name: "Factures", icon: "[gravity-ui--file-dollar]", color: 'red', destination: '/invoices'},
    ]

    useEffect(() => {
        if (!opened) return setMaxNavWidth(40)

        // Get the width of the widest nav label
        let navLabels = Array.from(document.getElementsByClassName('nav-label'))
        navLabels = navLabels.map((label) => label.offsetWidth)
        setMaxNavWidth(Math.max(...navLabels))
    }, [opened])

    return (
        <>
            {/*children, title, description, buttonLabel, triggerLabel, setIsOpen, isOpen */}
            <Dialog
                title="Recherche"
                description="Rechercher tout ce que vous voulez"
                buttonLabel="rechercher"
                isOpen={isDialogOpened}
                setIsOpen={setIsDialogOpened}
            >
                <Search></Search>
            </Dialog>
            <nav className={`main-layout-section relative p-4 flex flex-col justify-between border-${color}-400`}>

                <button
                    className="absolute right-0 flex items-center justify-center w-6 h-6 translate-x-1/2 bg-white border-2 border-gray-300 rounded-full shadow-offset hover:bg-gray-200"
                    onClick={() => setOpened(!opened)}
                >
                    <span className='transition-all ease-in-out duration-700 icon-[mdi--chevron-right]'
                          style={{rotate: `${-180 * opened}deg`}}>&gt;</span>
                </button>

                <div
                    className='flex flex-col items-start justify-start gap-6 overflow-hidden transition-all duration-700 ease-in-out'
                    style={{maxWidth: `${maxNavWidth}px`}}>
                    <img className='w-10' src="./images/zonta.png" alt="Zonta"></img>
                    <NavIcon name="Recherche" onClick={() => setIsDialogOpened(true)}
                             icon="[material-symbols--search-rounded]"/>
                    <hr className='w-full rotate-[2] border border-gray-400'></hr>

                    {NavIcons.map((icon, index) => {
                        return <NavIcon key={index} {...icon} selected={icon.name === subject}
                                        destination={icon.destination}/>
                    })}

                </div>

                <div
                    className='flex flex-col items-start justify-start gap-6 overflow-hidden transition-all duration-700 ease-in-out'
                    style={{maxWidth: `${maxNavWidth}px`}}>
                    <NavIcon name="Paramètres" icon="[mdi--cog]"/>
                </div>
            </nav>
        </>
    )
}

export default Navbar
