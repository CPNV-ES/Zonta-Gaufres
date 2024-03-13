import React from 'react'

const NavIcon = ({icon, name, destination}) => {
    return (
        <a className="relative flex items-center text-lg overflow-hidden cursor-pointer" href={destination}>
            <div>
                <span className={`absolute text-4xl h-full text-center w-10 text-gray-400 icon-${icon}`}></span>
                <span className='pl-12 block h-full align-middle'>{name}</span>
            </div>
        </a>
    )
}

export default NavIcon