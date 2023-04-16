import React, { useState } from 'react'
import Head from "next/head";
import { MdOutlineSubject, MdCalendarToday } from "react-icons/md";
import axios from "axios"
import { SidePanel, Navtab } from '../../../components/utility';
import { getFormattedDate } from '../../../functions/time';
import { AttendanceCard, AttendanceExpired } from '../../../components/student';

const Attendance = ({ ip, notifications,attendanceLogs }) => {
  const [tab, setTab] = useState(1);


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
          <div className='bg-white shadow-md'>
            <Navtab />
          </div>
          <div className='p-6'>
            <div className='mx-auto w-11/12 rounded-md'>
              <div className="my-4 font-semibold text-blue-800 flex">
                <div className='bg-blue-100 px-4 py-2 rounded-3xl flex items-center mr-2'><MdCalendarToday /> <span className='ml-2'>{getFormattedDate()}</span></div>
                <span className='bg-blue-100 px-4 py-2 rounded-3xl'>IP : {ip}</span>
              </div>
              <div className='w-full flex mt-7'>
                <span className={`px-8 py-3 font-semibold border-b-2 ${tab === 1 ? ' bg-indigo-600 text-white' : 'text-indigo-600  hover:border-indigo-600 border-b-2 border-indigo-600'}  cursor-pointer bg-white`} onClick={() => setTab(1)}>Live</span>
                <span className={`px-6 py-3 font-semibold border-b-2 ${tab === 2 ? ' bg-indigo-600  text-white' : 'text-indigo-600  hover:border-indigo-600 border-b-2 border-indigo-600'}  cursor-pointer bg-white`} onClick={() => setTab(2)}>Expired</span>
              </div>
              <div>
                {
                  tab === 1 ? 
                  (<AttendanceCard  ip={ip} notifications={notifications} attendanceLogs={attendanceLogs}/>) : (<AttendanceExpired notifications={notifications} attendanceLogs={attendanceLogs}/>)
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}


export async function getServerSideProps(context) {

  const { studentId } = context.query;

  try {

    const { data: attendanceInfo } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/attendance/getInfoS`, {
      params: { studentId }
    })
   
    const { notifications } = attendanceInfo.classInfo;
    const { ip,attendanceLogs } = attendanceInfo;
    return { props: { ip, notifications,attendanceLogs } };

  }
  catch (err) {

    if (err.response.status === 409) {
      return {
        notFound: true,
      };
    }

  }

}
export default Attendance