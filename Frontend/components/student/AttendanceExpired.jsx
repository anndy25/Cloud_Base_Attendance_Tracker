import React from 'react'
import { MdOutlineSubject, MdCalendarToday,MdPendingActions } from "react-icons/md";
import { RiAlertFill } from "react-icons/ri";
import { getFormattedDate } from '../../functions/addTime';

const AttendanceExpired = () => {
    return (
        <div className="w-full bg-white shadow-lg my-2 flex justify-between py-3 px-12 text-lg font-semibold text-slate-600  rounded-md">
            <div className='flex items-center'><MdOutlineSubject></MdOutlineSubject><span className='ml-2'>JavaScript</span></div>
            <div className='flex items-center'><MdCalendarToday /> <span className='ml-2'>{getFormattedDate()}</span></div>
            <div className='flex items-center'><RiAlertFill /><span className='ml-2'>1:37 PM</span></div>
            <div className='flex items-center py-2 px-6 rounded-3xl  bg-teal-100 text-teal-600'><MdPendingActions /><span className='ml-2'>Marked</span></div>
        </div>
    )
}

export default AttendanceExpired