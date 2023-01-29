import React from 'react';
import Head from "next/head";
import { SidePanel, Navtab, Calender, LineChart, ScheduleCard } from '../../components/utility';
import { SubjectList } from "../../components/teacher";

const dashboard = () => {
    let link = { dashboard: "/teacher/dashboard", attendance: "/teacher/attendance", flag: false }
    return (
        <>
            <Head>
                <title>Alpha | Teacher Dashboard</title>
            </Head>
            <div className='min-h-screen flex justify-center'>
                <div className="top-0 left-0 sticky h-screen w-[18%]  overflow-x-auto shadow-xl shadow-blue-200">
                    <SidePanel link={link} />
                </div>
                <div className='w-[82%] flex'>
                    <section className='w-[73%] px-2 pl-4 flex flex-col items-center'>
                        <h1 className="font-bold text-2xl text-gray-600 my-6 w-full px-4">Dashboard</h1>
                        <div className='shadow-md rounded-xl border'>
                            <h1 className="font-bold text-lg text-gray-600 px-4 mt-4">Attendace Overview</h1>
                            <LineChart />
                        </div>
                        <div className="w-[50rem] py-6">
                            <h1 className="font-bold text-xl text-gray-600 mb-6 ">Subjects</h1>
                            <SubjectList />
                        </div>
                    </section>
                    <aside className='w-[26%] border-l'>
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
        </>
    )
}

export default dashboard