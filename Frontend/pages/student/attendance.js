import React from 'react'
import Head from "next/head";
import { SidePanel, Navtab } from '../../components/utility';
import { AttendanceCard } from '../../components/Student';

const attendace = () => {
  let link={ dashboard: "/student/dashboard", attendance: "/student/attendance" }
  return (
    <>
     <Head>
        <title>Alpha | Attendance</title>
      </Head>
      <div className="min-h-screen flex">
        <div className="top-0 left-0 sticky h-screen w-[18%]  overflow-x-auto shadow-xl">
          <SidePanel link={link} />
        </div>
        <div className="w-[82%] ">
          <div className='border-b-2'>
            <Navtab />
          </div>
          <div className='p-6 bg-neutral-50 min-h-screen'>
            <h1 className="font-bold text-xl text-gray-600">Mark Your Attendace!!</h1>
            <div className=' py-4'>
              <AttendanceCard />
              {/* <AttendanceCard />
              <AttendanceCard />
              <AttendanceCard /> */}
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default attendace