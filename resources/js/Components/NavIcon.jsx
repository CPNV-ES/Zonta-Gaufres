import React from 'react'

const NavIcon = ({ icon, name, destination }) => {
    return (
        <a className="relative h-10 w-full flex text-lg overflow-hidden cursor-pointer rounded hover:bg-red-200" href={destination}>
            <span className={`absolute text-4xl h-full text-center w-10 text-gray-400 icon-${icon}`}></span>
            <span className='pl-12 pr-2 flex h-full text-xl items-center'>{name}</span>
        </a>
    )
}

export default NavIcon