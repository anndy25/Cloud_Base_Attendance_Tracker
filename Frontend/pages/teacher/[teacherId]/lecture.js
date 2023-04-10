import Head from "next/head";
import React, { useState } from "react";
import Link from "next/link";
import axios from 'axios';
import { GrPrevious } from "react-icons/gr";
import { useRouter } from 'next/router'

import { SubjectAttendanceTable, ShowStudents, TakeAttendance, AttendanceCard } from '../../../components/teacher'
import { SidePanel, Navtab } from '../../../components/utility';

function switchTab(tab, attendanceDetails, studentDetails, noty) {
    if (tab === 1) return <SubjectAttendanceTable props={attendanceDetails} />;

    if (tab === 2) return <ShowStudents studentDetails={studentDetails} />;

    if (tab === 3) return <TakeAttendance noty={noty} />;
}

const TSubject = ({ students, attendanceDetails, className, subjectName, noty }) => {

    const router = useRouter();
    const {teacherId}=router.query;
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
                <div className="w-[82%] bg-slate-50">
                    <div className='shadow-md bg-white'>
                        <Navtab />
                    </div>
                    <div className='p-6 min-h-[90%] '>
                        <Link href={`/teacher/${teacherId}`} className='p-2 rounded-lg mb-4 font-semibold justify-center items-center bg-slate-200 flex cursor-pointer w-28'><GrPrevious /> <span className='mx-1'>Go Back</span></Link>
                        <header className='flex font-semibold'>
                            <span className='bg-blue-100 text-blue-800 px-4 py-2 rounded-3xl'>{subjectName}</span>
                            <span className='bg-blue-100 text-blue-800 px-4 py-2 mx-4 rounded-3xl'>{className}</span>
                        </header>
                        <div className='mx-auto w-10/12 shadow-md rounded-2xl border mt-12 mb-6 bg-white'>
                            <div className='flex justify-center'>
                                <span className={`px-6 py-3.5 font-semibold ${tab === 1 ? 'text-white bg-indigo-600 border-b-2 ' : 'text-gray-500 hover:text-indigo-600 hover:bg-slate-100'}  cursor-pointer `} onClick={() => setTab(1)}>Sheet</span>
                                <span className={`px-4 py-3.5 font-semibold   ${tab === 2 ? 'text-white bg-indigo-600 border-b-2 ' : 'text-gray-500 hover:text-indigo-600 hover:bg-slate-100'}  cursor-pointer `} onClick={() => setTab(2)}>Students</span>
                                <span className={`px-4 py-3.5 font-semibold  ${tab === 3 ? 'text-white bg-indigo-600 border-b-2 ' : 'text-gray-500 hover:text-indigo-600 hover:bg-slate-100'}  cursor-pointer `} onClick={() => setTab(3)} >Attendance</span>
                            </div>
                            <div className='overflow-x-auto  border-t'>
                                {
                                    switchTab(
                                        tab, attendanceDetails,
                                        { students, totalLecture: attendanceDetails.attendanceDetails.presentStudents },
                                        { ...noty, subjectName}
                                    )
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

    const { teacherId, classId, subjectId } = context.query;

    try {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/attendance/getDetails?classId=${classId}&subjectId=${subjectId}&teacherId=${teacherId}`,)
        if (!data) {
            return {
                notFound: true,
            };
        }


        const { data: noty } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/attendance/getInfoT`, {
            params: { classId, subjectId, teacherId }
        })

        const { students, attendanceDetails,  className, subjectName } = data;
      
        return { props: { students, attendanceDetails, className, subjectName, noty } };

    } catch (err) {

        if (err.response.status === 409) {
            return {
                notFound: true,
            };
        }
    }

}

export default TSubject
