import React from 'react'
import Head from "next/head";
import { SidePanel, Navtab } from '../../../components/utility';
import { SearchBox, ScheduleTable } from '../../../components/admin';
const Schedule = () => {

  let list=['All','Department','Class']
  return (
    <>
      <Head>
        <title>Alpha | Schedule</title>
      </Head>
      <div className='min-h-screen flex justify-center'>
        <div className="top-0 left-0 sticky h-screen w-[18%]  overflow-x-auto shadow-xl shadow-blue-200">
          <SidePanel status={3} />
        </div>
        <div className='w-[82%] min-h-screen'>
          <aside className='w-full border-l'>
            <div className='border-b-2'>
              <Navtab />
            </div>
            <div className='p-6'>
              <h1 className="font-bold text-2xl text-gray-600">Time Table</h1>
              <div className='w-4/5 mx-auto  pt-4 my-8 border-t rounded-2xl shadow-md overflow-x-auto'>

                <div className='pl-12'>
                  <SearchBox list={list}/>
                </div>
                <ScheduleTable />

              </div>
            </div>

          </aside>
        </div>
      </div>


    </>
  )
}

export default Schedule