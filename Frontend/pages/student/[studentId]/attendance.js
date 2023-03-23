import React from 'react'
import Head from "next/head";
import { SidePanel, Navtab } from '../../../components/utility';
import { AttendanceCard,AttendanceExpired } from '../../../components/student';

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
        <div className="w-[82%] bg-slate-50">
          <div className='border-b-2 bg-white' >
            <Navtab />
          </div>
          <div className='p-6'>
            <div className=" my-4">
              <span className='font-semibold  text-blue-800 bg-blue-100 px-4 py-2 rounded-3xl'>IP : 103.146.240.70</span>
            </div>
            <h1 className="font-bold text-2xl text-gray-600">Mark Your Attendace!!</h1>
            <div className='py-4'>
              <AttendanceCard />
              <AttendanceExpired/>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default attendace