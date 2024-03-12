import React from 'react'

const Navbar = () => {
    return (
        <nav className='w-20 h-full py-4 flex items-center justify-between flex-col border-2 border-gray-300 rounded-xl shadow-offset'>

            <div className='flex flex-col items-center gap-6'>
                <img src="./images/zonta.png" alt="Zonta"></img>
                <a className="text-4xl cursor-pointer text-gray-400 icon-[material-symbols--search-rounded]"></a>
                <hr className='w-full border border-gray-400'></hr>
                <a className="text-4xl cursor-pointer text-gray-400 icon-[material-symbols--article-outline]"></a>
                <a className="text-4xl cursor-pointer text-gray-400 icon-[mdi--truck-outline]"></a>
                <a className="text-4xl cursor-pointer text-gray-400 icon-[ic--outline-people]"></a>
                <a className="text-4xl cursor-pointer text-gray-400 icon-[gravity-ui--file-dollar]"></a>
            </div>
            <a className="text-4xl cursor-pointer text-gray-400 icon-[mdi--cog]"></a>
        </nav>
    )
}

export default Navbar