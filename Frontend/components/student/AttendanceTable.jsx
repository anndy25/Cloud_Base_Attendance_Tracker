import React  from 'react'
import { MdSubject } from "react-icons/md";
import { BiBook } from "react-icons/bi";
import { BsPercent } from "react-icons/bs";
import { FaChalkboardTeacher } from "react-icons/fa";

const Message = ({ Component, title }) => {
    return (<>
        <div className='flex items-center justify-center'><Component /><p className='mx-2'>{title}</p></div>
    </>)
}

const AttendanceTable = () => {
    return ( 
            <table className="w-full text-center">
                <thead className=" text-slate-800">
                    <tr>
                        <th className="p-3"><Message Component={BiBook} title='Subject' /></th>
                        <th ><Message Component={MdSubject} title='Attendance' /></th>
                        <th ><Message Component={BsPercent} title='Percentage' /></th>
                        <th ><Message Component={FaChalkboardTeacher} title='Teacher' /></th>
                    </tr>
                </thead>
                <tbody className='text-slate-600 font-medium'>

                    <tr
                        className=" even:bg-blue-50"
                    >
                        <td className="p-4">Data Structure and Aogrithm</td>
                        <td >78/90</td>

                        <td >
                            87%
                        </td>
                        <td className="cursor-pointer flex  items-center ">
                            <div className="w-12 h-12 rounded-full border-2  mr-2"></div>
                            <span>Srinivasa Ramanujan</span>
                        </td>
                    </tr>
                    <tr
                        className=" even:bg-blue-50"
                    >
                        <td className="p-4">Data Structure and Aogrithm</td>
                        <td >78/90</td>

                        <td >
                            87%
                        </td>
                        <td className="cursor-pointer flex items-center p-1">
                            <div className="w-12 h-12 rounded-full border-2  mr-2"></div>
                            <span>Srinivasa Ramanujan</span>
                        </td>
                    </tr>
                   

                </tbody>
            </table>
        
    )
}

export default AttendanceTable