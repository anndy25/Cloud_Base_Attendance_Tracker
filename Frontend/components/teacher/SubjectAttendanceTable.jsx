import React, { useState } from 'react'
import { BsCalendarDate } from "react-icons/bs";
import { CiViewList } from "react-icons/ci";
import { MdSubject } from "react-icons/md";
import { BiTime } from "react-icons/bi";
import { useRouter } from 'next/router'

const Message = ({ Icon, title }) => {

    return (<>
        <div className='flex items-center justify-center'><Icon /><p className='mx-2 text-center'>{title}</p></div>
    </>)
}
const SubjectAttendanceTable = ({ attendanceDetails }) => {
    const router = useRouter();
    return (

        <>
            <table className='w-full text-left bg-white'>
                <thead className=" text-slate-700 font-semibold ">
                    <tr className='bg-indigo-50'>
                        <th className="p-4 w-1/4 "><Message Icon={BsCalendarDate} title='Date' /></th>
                        <th  ><Message Icon={BiTime} title='Time' /></th>
                        <th  ><Message Icon={MdSubject} title='Present' /></th>
                        <th  ><Message Icon={CiViewList} title='View Absent' /></th>
                    </tr>
                </thead>
                <tbody className='text-slate-600 font-medium '>
                    {
                        attendanceDetails.map((attendance, key) => {
                            return (
                                <tr className=" even:bg-blue-50 hover:text-indigo-600 cursor-pointer" key={key}
                                    onClick={() => { router.push(`absents`) }}
                                >
                                    <td className=" p-4">{attendance.date}</td>
                                    <td >{attendance.expiredAt}</td>
                                    <td >{presentStudents.length}</td>
                                    <td>Views</td>
                                </tr>
                            )
                        })
                    }


                </tbody>
            </table>
        </>

    )
}

export default SubjectAttendanceTable