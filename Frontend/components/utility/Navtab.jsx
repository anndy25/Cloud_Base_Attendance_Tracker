import React from 'react'
import { FaRegBell } from "react-icons/fa";

const Navtab = () => {
    return (
        <>

            <div className="h-[9.4%] p-2 w-full">
                <nav>
                    <div className="flex justify-end items-center">
                        <FaRegBell className='h-6 w-6 mr-4 hover:cursor-pointer' />
                        <div className={`h-12 text-white font-semibold w-12 rounded-full ring-2 ring-white uppercase border flex justify-center items-center cursor-pointer shadow-lg bg-cyan-600`}>
                            <p>
                                AM
                            </p>
                        </div>
                    </div>
                </nav>
            </div>

        </>
    );

}

export default Navtab