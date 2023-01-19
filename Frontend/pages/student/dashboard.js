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
        <Navtab/>
        <div className='flex justify-center'>
          <section className='w-[75%] flex flex-col items-center'>
            <LineChart className='w-full'/>
          </section>
          <aside>
          <Calender/>
          <div className="pl-2">
          <h1 className="font-bold text-lg mt-2">Today's Schedule</h1>
          <ul>
            <li className="my-2"><b>1)</b> DBMS - 12.30 PM-1PM</li>
            <li className="my-2"><b>1)</b> DBMS - 12.30 PM-1PM</li>
          </ul>
          
          </div>
          </aside>
        </div>
    
        </div>
      </div>
    </div>
  )
}

export default dashboard