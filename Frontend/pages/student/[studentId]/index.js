import React, { useState } from 'react'
import Head from "next/head";

import { SidePanel, Navtab, Calender, LineChart, ScheduleCard } from '../../../components/utility';
import { AttendanceTable } from '../../../components/student';


const dashboard = () => {
  const schedules = [{ from: "14:00", to: "16:00", subjectId: { shortForm: 123 } }]

  return (
    <>
      <Head>
        <title>Alpha | Student Dashboard</title>
      </Head>
      <div className="min-h-screen flex">
        <div className="top-0 left-0 sticky h-screen w-[18%]  overflow-x-auto shadow-xl shadow-blue-200">
          <SidePanel status={1} />
        </div>
        <div className='w-[82%] '>
          <div className='shadow-md '>
            <Navtab />
          </div>
          <div className='flex'>
            <section className='w-[74%] py-12 flex flex-col items-center'>

              <div className='w-11/12 mx-auto shadow-md rounded-xl border'>
                <h1 className="font-bold text-lg text-gray-600 px-4 mt-4">Attendace Overview</h1>
                <LineChart />
              </div>
              <div className='w-11/12 shadow-md rounded-xl border mt-3'>
                <div className="overflow-x-auto">
                  <AttendanceTable />
                </div>
              </div>
            </section>
            <aside className='w-[26%]  py-12 pr-4'>
              <div className=''>
                <Calender />
              </div>
              <div className='shadow-md p-3 rounded-md my-3 border'>
                <h1 className="text-lg my-2">{`Today's Schedule`}</h1>
                {/* <ScheduleCard schedules={schedules} /> */}
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  )
}

export default dashboard