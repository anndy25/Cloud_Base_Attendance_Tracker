import React, { useState } from 'react'
import Head from "next/head";

import { SidePanel, Navtab, Calender, LineChart, ScheduleCard } from '../../components/utility';
import { AttendanceTable } from './../../components/student';


const dashboard = () => {

  let link = { dashboard: "/student/dashboard", attendance: "/student/attendance", flag: true };

  return (
    <>
      <Head>
        <title>Alpha | Student Dashboard</title>
      </Head>
      <div className="min-h-screen flex">
        <div className="top-0 left-0 sticky h-screen w-[18%]  overflow-x-auto shadow-xl shadow-blue-200">
          <SidePanel link={link} />
        </div>
        <div className="w-[80%] py-2 ">
          <div className='flex justify-center'>
            <section className='w-[75%] flex flex-col items-center py-4'>
              <h1 className="font-bold text-2xl text-gray-600 my-4 w-full px-4">Dashboard</h1>
              <div className='shadow-md rounded-xl border'>
                <h1 className="font-bold text-lg text-gray-600 px-4 mt-4">Attendace Overview</h1>
                <LineChart />
              </div>
              <div className='w-[50rem] my-4 '>
                <div className='shadow-md rounded-xl border pt-4'>
                  <h1 className="font-bold text-lg text-gray-600 px-4 mb-4">Subject Details</h1>
                  <div className="overflow-x-auto">
                    <AttendanceTable />
                  </div>
                </div>
              </div>
            </section>
            <aside className='w-[24%] border-l'>
              <div className='border-b-2'>
                <Navtab />
              </div>


              <div className='pl-4'>
                <Calender />
                <h1 className="text-lg mt-2">{`Today's Schedule`}</h1>
                <ScheduleCard />
              </div>

            </aside>
          </div>

        </div>
      </div>
    </>
  )
}

export default dashboard