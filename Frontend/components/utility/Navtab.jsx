import React, { useEffect, useState } from 'react'
import { FaRegBell } from "react-icons/fa";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import Image from "next/image";

const Navtab = () => {

    const [userInfo, setUserInfo] = useState();

    useEffect(() => {
        setUserInfo(JSON.parse(localStorage.getItem("userInfo")));
    }, [])
    return (
        <>
            {
                userInfo &&
                (

                    <div className="h-[9.4%] p-2 w-full">
                        <nav>
                            <div className="flex justify-end items-center">
                                <FaRegBell className='h-6 w-6 hover:cursor-pointer' />
                                <div className={`font-semibold  flex justify-center items-center cursor-pointer`}>
                                    <Image
                                        src={userInfo.image.url}
                                        width="120" height="120"
                                        className="ring-2 ring-white w-12 h-12 border mx-2 rounded-full" alt='user image' />
                                    <small className='w-1/2 truncate'>{userInfo.email}</small>
                                    <MdOutlineKeyboardArrowUp className='text-3xl'/>
                                </div>
                            </div>
                        </nav>
                    </div>
                )
            }
        </>
    );

}

export default Navtab