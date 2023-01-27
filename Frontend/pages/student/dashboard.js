import React, { useState } from 'react'
import Head from "next/head";

import { SidePanel, Navtab, Calender, LineChart, ScheduleCard } from '../../components/utility';
import { AttendanceTable } from '../../components/student';


const dashboard = () => {

  let link = { dashboard: "/student/dashboard", attendance: "/student/attendance", flag:true };

  return (
    <>
      <Head>
        <title>Alpha | Student Dashboard</title>
      </Head>
      <div className="min-h-screen flex">
        <div className="top-0 left-0 sticky h-screen w-[18%]  overflow-x-auto shadow-xl shadow-blue-200">
          <SidePanel link={link} />
        </div>
        <div className="w-[82%] py-4 ">
          <div className='flex justify-center'>
            <section className='w-[75%] flex flex-col items-center py-4'>
              <div >
                <h1 className="font-bold text-xl text-gray-600 my-6">Dashboard</h1>
                <LineChart />
              </div>
              <div className='w-[92%] mt-3'>
                <div>
                  <h1 className="font-bold text-xl text-gray-600 my-3 p-2">Attendace</h1>
                  <div className="my-4 shadow-md rounded-2xl border  overflow-x-auto pt-4">
                  <AttendanceTable />
                  </div>
                </div>
              </div>
            </section>
            <aside className='w-[23%]'>
              <div className='border-b-2'>
                <Navtab />
              </div>
              <Calender />
              <div>
                <div>
                  <h1 className="text-lg mt-2">Today's Schedule</h1>
                  <ScheduleCard />
                </div>
              </div>
            </aside>
          </div>

        </div>
      </div>
    </>
  )
}

export default dashboard