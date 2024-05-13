import React from 'react'

const NavIcon = ({icon, name, destination, selected, color = 'gray', onClick = null}) => {

    return (
        <a className={`relative h-10 w-full flex text-lg overflow-hidden cursor-pointer rounded hover:bg-${color}-200`}
           href={destination} onClick={onClick}>
            <span
                className={`absolute text-4xl h-full text-center w-10 icon-${icon} ${selected ? 'text-' + color + '-600' : 'text-gray-400'}`}>{name[0]}</span>
            <span className='nav-label pl-12 pr-2 flex h-full text-xl items-center'>{name}</span>
        </a>
    )
}

export default NavIcon
