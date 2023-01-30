import React, { useState } from 'react'
import Head from "next/head";

import { SidePanel, Navtab, Calender, LineChart, ScheduleCard } from '../../components/utility';
import { AttendanceTable } from './../../components/student';


const dashboard = () => {

  
  return (
    <>
      <Head>
        <title>Alpha | Student Dashboard</title>
      </Head>
      <div className="min-h-screen flex">
        <div className="top-0 left-0 sticky h-screen w-[18%]  overflow-x-auto shadow-xl shadow-blue-200">
          <SidePanel status={1} />
        </div>
        <div className="w-[82%] pl-2 ">
          <div className='flex justify-center'>
            <section className='w-[73%] flex flex-col items-center py-4'>
              <h1 className="font-bold text-2xl text-gray-600 my-6 w-full px-4">Dashboard</h1>
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
            <aside className='w-[25%] border-l'>
              <div className='border-b-2'>
                <Navtab />
              </div>


              <div className='pl-5'>
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