import Head from "next/head";
import React, { useState } from "react";
import { SidePanel, Navtab } from '../../../components/utility';
import { SubjectAttendanceTable,ShowStudents,TakeAttendance,AttendanceCard } from '../../../components/teacher'
import { GrPrevious } from "react-icons/gr";
import Link from "next/link";

function switchTab(tab){
    if(tab===1) return <SubjectAttendanceTable/>;

    if(tab===2) return <ShowStudents />;

    // if(tab===3) return <AttendanceCard />;
    if(tab===3) return <TakeAttendance/>;
}

const tSubject = () => {
   
    let [tab, setTab] = useState(1);

    return (
        <>
            <Head>
                <title>Alpha | Teaching Details</title>
            </Head>
            <div className="min-h-screen flex">
                <div className="top-0 left-0 sticky h-screen w-[18%]  overflow-x-auto shadow-xl shadow-blue-200">
                    <SidePanel status={0} />
                </div>
                <div className="w-[82%] ">
                    <div className='border-b-2'>
                        <Navtab />
                    </div>
                    <div className='p-6 min-h-[90%] bg-slate-50'>
                        <Link href='/teacher/dashboard' className='p-2 rounded-lg mb-4 font-semibold justify-center items-center bg-slate-200 flex cursor-pointer w-28'><GrPrevious /> <span className='mx-1'>Go Back</span></Link>
                        <header className='flex font-semibold'>
                            <span className='bg-blue-100 text-blue-800 px-4 py-2 rounded-3xl'>JavaScript</span>
                            <span className='bg-blue-100 text-blue-800 px-4 py-2 mx-4 rounded-3xl'>Class VI</span>
                        </header>
                        <div className='mx-auto w-10/12 shadow-md rounded-2xl border mt-12 mb-6 bg-white'>
                            <div className='flex justify-center'>
                                <span className={`px-6 py-3.5 font-semibold ${tab === 1 ? 'text-white bg-indigo-600 border-b-2 ' : 'text-gray-500 hover:text-indigo-600 hover:bg-slate-100'}  cursor-pointer `} onClick={()=>setTab(1)}>Sheet</span>
                                <span className={`px-4 py-3.5 font-semibold   ${tab === 2 ? 'text-white bg-indigo-600 border-b-2 ' : 'text-gray-500 hover:text-indigo-600 hover:bg-slate-100'}  cursor-pointer `} onClick={()=>setTab(2)}>Students</span>
                                <span className={`px-4 py-3.5 font-semibold  ${tab === 3 ? 'text-white bg-indigo-600 border-b-2 ' : 'text-gray-500 hover:text-indigo-600 hover:bg-slate-100'}  cursor-pointer `} onClick={()=>setTab(3)} >Attendance</span>
                            </div>
                            <div className='overflow-x-auto  border-t'>
                               {switchTab(tab)}
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default tSubject
