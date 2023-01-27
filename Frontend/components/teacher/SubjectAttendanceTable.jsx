import React, { useState } from 'react'
import { BsCalendarDate } from "react-icons/bs";
import { CiViewList } from "react-icons/ci";
import { MdSubject } from "react-icons/md";
import { BiTime } from "react-icons/bi";


const Message = ({ Component, title }) => {
    return (<>
        <div className='flex items-center justify-center'><Component /><p className='mx-2 text-center'>{title}</p></div>
    </>)
}
const SubjectAttendanceTable = () => {
    return (

        <>
            <table className='w-full text-center'>
                <thead className=" text-slate-700 font-semibold ">
                    <tr>
                        <th className="p-4 w-1/4 "><Message Component={BsCalendarDate} title='Date' /></th>
                        <th  ><Message Component={BiTime} title='Time' /></th>
                        <th  ><Message Component={MdSubject} title='Present' /></th>
                        <th  ><Message Component={CiViewList} title='View Absent' /></th>
                    </tr>
                </thead>
                <tbody className='text-slate-600 font-medium '>

                    <tr
                        className=" even:bg-blue-50 "
                    >
                        <td className=" p-4">24 Jan, 2023</td>
                        <td >9.30 PM</td>

                        <td >
                            80
                        </td>
                        <td className="  cursor-pointer ">Views
                        </td>
                    </tr>
                    <tr
                        className=" even:bg-blue-50 "
                    >
                        <td className=" p-4">24 Jan, 2023</td>
                        <td >9.30 PM</td>

                        <td >
                            80
                        </td>
                        <td className=" cursor-pointer ">Views
                        </td>
                    </tr>

                </tbody>
            </table>
        </>

    )
}

export default SubjectAttendanceTable