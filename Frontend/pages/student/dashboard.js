import React, { useState } from 'react'
import Head from "next/head";

import { SidePanel, Navtab, Calender, LineChart } from '../../components/utility';
import { AttendanceTable } from '../../components/student';


const dashboard = () => {

  let link={ dashboard: "/student/dashboard", attendance: "/student/attendance" }


  

  return (
    <>
      <Head>
        <title>Alpha | Student Dashboard</title>
      </Head>
      <div className="min-h-screen flex">
        <div className="top-0 left-0 sticky h-screen w-[18%]  overflow-x-auto shadow-xl">

          <SidePanel link={link} />

        </div>
        <div className="w-[82%] py-4 bg-neutral-50">
          <div className='flex justify-center'>
            <section className='w-[75%] flex flex-col items-center py-4'>
              <h1 className="w-[92%] font-bold text-xl text-gray-600">Dashboard</h1>
              <div className='shadow-md border-t mt-4 p-2'>
                <LineChart className='w-full' />
              </div>
              <div className='w-[92%]'>
                <h1 className="font-bold text-xl text-gray-600 mt-8 mb-4 ">Attendace</h1>
                <div className='px-4 py-6 shadow-md border-t'>
                  <AttendanceTable />

                </div>
              </div>
            </section>
            <aside className='w-[22%] border-l pl-2'>
              <div className='border-b-2'>
                <Navtab />
              </div>
              <Calender />
              <div className="pl-2">
                <h1 className="font-bold text-lg mt-2">Today's Schedule</h1>
                <div className='font-bold text-gray-600'>
                  <div className="shadow-lg p-2 my-4 rounded-md border-2 border-blue-700 bg-white"><span className="border-r-2 pr-2 py-2">1 PM- 2 PM</span><span className="mx-2">DBMS</span></div>
                  <div className="shadow-md p-2 my-4 rounded-md border-2 border-blue-700 bg-white"><span className="border-r-2 pr-2 py-2">1 PM- 2 PM</span><span className="mx-2">DBMS</span></div>
                  <div className="shadow-md p-2 my-4 rounded-md border-2 border-blue-700 bg-white"><span className="border-r-2 pr-2 py-2">1 PM- 2 PM</span><span className="mx-2">DBMS</span></div>
                  <div className="shadow-md p-2 my-4 rounded-md border-2 border-blue-700 bg-white"><span className="border-r-2 pr-2 py-2">1 PM- 2 PM</span><span className="mx-2">DBMS</span></div>
                  <div className="shadow-md p-2 my-4 rounded-md border-2 border-blue-700 bg-white"><span className="border-r-2 pr-2 py-2">1 PM- 2 PM</span><span className="mx-2">DBMS</span></div>
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