import React from 'react'
import Head from "next/head";
import { SidePanel, Navtab } from '../../components/utility';
import { AttendanceCard } from '../../components/student';

const attendace = () => {
 
  return (
    <>
     <Head>
        <title>Alpha | Student Attendance</title>
      </Head>
      <div className="min-h-screen flex">
        <div className="top-0 left-0 sticky h-screen w-[18%]  overflow-x-auto shadow-xl shadow-blue-200">
          <SidePanel status={1} />
        </div>
        <div className="w-[82%]">
          <div className='border-b-2'>
            <Navtab />
          </div>
          <div className='p-6'>
            <h1 className="font-bold text-2xl text-gray-600">Mark Your Attendace!!</h1>
            <div className='py-4'>
              <AttendanceCard />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default attendace