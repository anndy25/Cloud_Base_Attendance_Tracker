import React from 'react'
import { MdOutlineSubject, MdCalendarToday } from "react-icons/md";
import { BsClockHistory } from "react-icons/bs";
import { RiAlertFill } from "react-icons/ri";
import { ReverseCounter } from '../utility';
import { getFormattedDate } from '../../functions/time';

const AttendanceCard = () => {
  return (
    <>
      <div className=" my-4 mx-2">
        <span className='font-semibold  text-blue-800 bg-blue-100 px-4 py-2 rounded-3xl'>IP : 103.146.240.70</span>
      </div>
      <div className="w-full  bg-blue-50 text-slate-600  shadow-lg flex justify-between p-4 font-semibold    rounded-b-md">
        <div className='flex items-center'><MdOutlineSubject></MdOutlineSubject><span className='ml-2'>JavaScript</span></div>
        <div className='flex items-center'><MdCalendarToday /> <span className='ml-2'>{getFormattedDate()}</span></div>
        <div className='flex items-center'><BsClockHistory /> <ReverseCounter targetTime="1:37 PM" /></div>
        <div className='flex items-center'><RiAlertFill /><span className='ml-2'>1:37 PM</span></div>
      </div>
    </>
  )
}

export default AttendanceCard