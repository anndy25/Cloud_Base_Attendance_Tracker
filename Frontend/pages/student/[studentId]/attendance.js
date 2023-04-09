import React, { useState } from 'react'
import Head from "next/head";
import { MdOutlineSubject, MdCalendarToday } from "react-icons/md";
import { SidePanel, Navtab } from '../../../components/utility';
import { getFormattedDate } from '../../../functions/time';
import { AttendanceCard, AttendanceExpired } from '../../../components/student';

const Attendance = () => {
  const [tab, setTab] = useState(1);


  return (
    <>
      <Head>
        <title>Alpha | Student Attendance</title>
      </Head>
      <div className="min-h-screen flex">
        <div className="top-0 left-0 sticky h-screen w-[18%]  overflow-x-auto shadow-xl shadow-blue-200">
          <SidePanel status={1} />
        </div>
        <div className="w-[82%] bg-slate-50">
          <div className='bg-white shadow-md'>
            <Navtab />
          </div>
          <div className='p-6'>
            <div className='mx-auto w-11/12 rounded-md'>
            <div className="my-4 font-semibold text-blue-800 flex">
              <span className='bg-blue-100 px-4 py-2 rounded-3xl'>IP : 103.146.240.70</span>
              <div className='bg-blue-100 px-4 py-2 rounded-3xl flex items-center ml-2'><MdCalendarToday /> <span className='ml-2'>{getFormattedDate()}</span></div>
            </div>
              <div className='w-full flex mt-7'>
                <span className={`px-8 py-3 font-semibold border-b-2 ${tab === 1 ? ' bg-indigo-600 text-white' : 'text-indigo-600  hover:border-indigo-600 border-b-2 border-indigo-600'}  cursor-pointer bg-white`} onClick={() => setTab(1)}>Live</span>
                <span className={`px-6 py-3 font-semibold border-b-2 ${tab === 2 ? ' bg-indigo-600  text-white' : 'text-indigo-600  hover:border-indigo-600 border-b-2 border-indigo-600'}  cursor-pointer bg-white`} onClick={() => setTab(2)}>Expired</span>
              </div>
              <div>
                {
                  tab === 1 ? (<AttendanceCard />) : (<AttendanceExpired />)
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Attendance