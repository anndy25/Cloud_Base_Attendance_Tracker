import React from 'react'
import { MdSubject } from "react-icons/md";
import { BiBook } from "react-icons/bi";
import { BsPercent } from "react-icons/bs";
import { FaChalkboardTeacher } from "react-icons/fa";
import Image from "next/image";

const Message = ({ Component, title }) => {
    return (<>
        <div className='flex items-center justify-center'><Component /><p className='mx-2'>{title}</p></div>
    </>)
}

const AttendanceTable = () => {
    return (
        <table className="w-full text-center">
            <thead className=" text-slate-700 bg-indigo-50 ">
                <tr>
                    <th className="p-3 w-1/4"><Message Component={BiBook} title='Subject' /></th>
                    <th ><Message Component={MdSubject} title='Attendance' /></th>
                    <th ><Message Component={BsPercent} title='Percentage' /></th>
                    <th ><Message Component={FaChalkboardTeacher} title='Teacher' /></th>
                </tr>
            </thead>
            <tbody className='text-slate-600 font-medium'>

                <tr className=" even:bg-indigo-50">
                    <td className="p-3">JavaScript</td>
                    <td >3/4</td>
                    <td >75%</td>
                    <td className="cursor-pointer flex  items-center ">
                        <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrQMFCDbUoSb21vj0jVEdBIjm3qdKUGbFjXIwf3GFKXg8b21mobjZpR1iUlPIgw_LXh40&usqp=CAU" width="120" height='120' className="w-12 h-12 mx-2 rounded-full" alt="photo" />
                        <span>Anjali Patel</span>
                    </td>
                </tr>

            </tbody>
        </table>

    )
}

export default AttendanceTable