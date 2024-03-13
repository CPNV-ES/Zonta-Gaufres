import React from 'react'

const NavIcon = () => {
    return (
        <a className="relative flex items-center text-lg overflow-hidden  w-10" href="">
            <span className="absolute text-4xl text-center w-10 text-gray-400 icon-[material-symbols--search-rounded]"></span>
            <span className='pl-12 align-middle'>Recherche</span>
        </a>
    )
}

export default NavIcon