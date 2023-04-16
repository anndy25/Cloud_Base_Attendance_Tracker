import React, { useState } from 'react'
import Head from "next/head";
import axios from 'axios'

import { SidePanel, Navtab, Calender, LineChart, ScheduleCard } from '../../../components/utility';
import { AttendanceTable } from '../../../components/student';


const dashboard = ({ classInfo, schedule, allSubjects, attendanceLogs }) => {

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
            <section className='w-[74%] pb-12  flex flex-col items-center'>
              <div className='font-semibold w-full pl-4 py-5'>
                <span className='bg-blue-100 text-blue-800 px-4 py-2 mx-4 rounded-3xl'>{classInfo.departmentId.departmentName}</span>
                <span className='bg-blue-100 text-blue-800 px-4 py-2 rounded-3xl'>{classInfo.className}</span>
              </div>

              <div className='w-11/12 mx-auto shadow-md rounded-xl border'>
                <h1 className="font-bold text-lg text-gray-600 p-4">Attendace Overview</h1>
                <LineChart />
              </div>
              <div className='w-11/12 shadow-md rounded-xl border mt-3'>
                <div className="overflow-x-auto">
                  <AttendanceTable classInfo={classInfo} allSubjects={allSubjects} attendanceLogs={attendanceLogs} />
                </div>
              </div>
            </section>
            <aside className='w-[26%]  pt-16 pb-12 pr-2'>
              <div className=''>
                <Calender />
              </div>
              <div className='shadow-md p-3 rounded-md my-3 border'>
                <h1 className="text-lg my-2">{`Today's Schedule`}</h1>
                <ScheduleCard schedules={schedule} />
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  )
}


export async function getServerSideProps(context) {

  const dayName = { 0: "sunday", 1: "monday", 2: "tuesday", 3: "wednesday", 4: "thursday", 5: "friday", 6: "saturday" };
  const day = dayName[new Date().getDay()];
  const { studentId } = context.query;

  try {

    const { data: attendanceInfo } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/attendance/getInfoS`, {
      params: { studentId }
    })

    const { data: allSubjects } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/subject/classSubjects/${attendanceInfo.classInfo._id}`)


    const { data: timeTable } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/class/timetable`, {
      params: { studentId, day }
    })
    const schedule = day === 'sunday' ? [] : timeTable.schedules[day];

    return { props: { classInfo: attendanceInfo.classInfo, schedule, allSubjects, attendanceLogs: attendanceInfo.attendanceLogs } };

  }
  catch (err) {

    if (err.response.status === 409) {
      return {
        notFound: true,
      };
    }

  }

}

export default dashboard