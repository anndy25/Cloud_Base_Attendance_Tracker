import React ,{Component}from 'react'
import { MdSubject } from "react-icons/md";
import { BiBook } from "react-icons/bi";
import { BsPercent } from "react-icons/bs";
import { FaChalkboardTeacher } from "react-icons/fa";

const Message = ({ Component, title }) => {
    return (<>
        <div className='flex items-center'><Component /><p className='mx-2'>{title}</p></div>
    </>)
}

const AttendanceTable = () => {
    return (
        <div>
            <table style={{ width: '100%' }} className="mx-auto  w-full">
                <thead className="text-lg text-slate-700 border-t border-b border-gray-400">
                    <tr>
                        <th className="text-left py-2"><Message Component={BiBook} title='Subject' /></th>
                        <th className="text-left py-2"><Message Component={MdSubject} title='Attendance' /></th>
                        <th className="text-left py-2"><Message Component={BsPercent} title='Percentage' /></th>
                        <th className="text-left py-2"><Message Component={FaChalkboardTeacher} title='Teacher' /></th>
                    </tr>
                </thead>
                <tbody className='text-stone-700 font-medium'>

                    <tr
                        className="ease-out duration-200 py-3 even:bg-amber-100"
                    >
                        <td className="text-left  py-1  ">Data Structure and Aogrith,</td>
                        <td className="text-left  py-1  ">78/90</td>

                        <td className="text-left  py-1   ">
                            87%
                        </td>
                        <td className=" py-1 text-left cursor-pointer flex  items-center ">
                            <div className="w-12 h-12 rounded-full border-2 border-blue-500  mr-2"></div>
                            <span>Srinivasa Ramanujan</span>
                        </td>
                    </tr>
                    <tr
                        className="ease-out duration-200 py-3  text-base  even:bg-stone-200"
                    >
                        <td className="text-left  py-1  ">Data Structure and Aogrith,</td>
                        <td className="text-left  py-1  ">78/100</td>

                        <td className="text-left  py-1   ">
                            87%
                        </td>
                        <td className=" py-1 text-left cursor-pointer flex  items-center ">
                            <div className="w-12 h-12 rounded-full border-2 border-blue-500  mr-2"></div>
                            <span>Srinivasa Ramanujan</span>
                        </td>
                    </tr>
                    <tr
                        className="ease-out duration-200 py-3  text-base  even:bg-stone-200"
                    >
                        <td className="text-left  py-1  ">Data Structure and Aogrith,</td>
                        <td className="text-left  py-1  ">78/100</td>

                        <td className="text-left  py-1   ">
                            87%
                        </td>
                        <td className=" py-1 text-left cursor-pointer flex  items-center ">
                            <div className="w-12 h-12 rounded-full border-2 border-blue-500  mr-2"></div>
                            <span>Srinivasa Ramanujan</span>
                        </td>
                    </tr>
                    <tr
                        className="ease-out duration-200 py-3  text-base  even:bg-stone-200"
                    >
                        <td className="text-left  py-1  ">Data Structure and Aogrith,</td>
                        <td className="text-left  py-1  ">78/100</td>

                        <td className="text-left  py-1   ">
                            87%
                        </td>
                        <td className=" py-1 text-left cursor-pointer flex  items-center ">
                            <div className="w-12 h-12 rounded-full border-2 border-blue-500  mr-2"></div>
                            <span>Srinivasa Ramanujan</span>
                        </td>
                    </tr>


                </tbody>
            </table></div>
    )
}

export default AttendanceTable