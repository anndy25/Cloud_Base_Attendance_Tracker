import React from 'react'
import SidePanel from '../../components/SidePanel'
import Navtab from '../../components/Navtab';
import Calender from '../../components/Calender'
import LineChart from '../../components/LineChart';

const dashboard = () => {
  return (
    <div>
      <div className="h-screen flex">
        <div className="sticky top-0 left-0 w-[18%] h-screen overflow-x-auto shadow-xl border-x-1">
          <SidePanel />
        </div>
        <div className="w-[82%]">
          <Navtab />
          <div className='flex justify-center'>
            <section className='w-[75%] flex flex-col items-center py-4'>
              <h1 className="w-[85%] font-bold text-xl text-gray-600">Dashboard</h1>
              <LineChart className='w-full' />
              <div className='w-[85%]'>
              <h1 className="font-bold text-xl text-gray-600 my-4">Attendace</h1>
      


              </div>
            </section>
            <aside className='w-[22%]'>
              <Calender />
              <div className="pl-2">
                <h1 className="font-bold text-lg mt-2">Today's Schedule</h1>

                <div>
                  <div className="shadow-inner shadow-md p-2 my-4"><span className="border-r-2 pr-2 py-2">1 PM- 2 PM</span><span className="mx-2">DBMS</span></div>
                  <div className="shadow-inner p-2 my-2"><span className="border-r-2 pr-2 py-2">1 PM- 2 PM</span><span className="mx-2">DBMS</span></div>
                  <div className="shadow-inner p-2 my-2"><span className="border-r-2 pr-2 py-2">1 PM- 2 PM</span><span className="mx-2">DBMS</span></div>
                </div>
              </div>
            </aside>
          </div>

        </div>
      </div>
    </div>
  )
}

export default dashboard