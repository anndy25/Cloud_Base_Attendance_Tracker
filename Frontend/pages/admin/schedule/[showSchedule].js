import React, { useState } from 'react';
import Head from "next/head";
import Link from "next/link";
import axios from "axios";
import { GrPrevious } from "react-icons/gr";
import { RiMenuAddLine } from "react-icons/ri";
import { MdDeleteOutline, MdSystemUpdateAlt } from "react-icons/md";
import { Navtab, SidePanel } from '../../../components/utility';
import { ScheduleModal, ClassSubjectList } from '../../../components/admin'
import { subjectMap } from '../../../functions/mapping';


const ShowSchedule = ({ classDetails, allSubjects, allTeachers }) => {

    const [isOpen, setIsOpen] = useState(false);
    const [classSubjectList, setClassSubjectList] = useState(classDetails.classSubjects);
    const [schedules, setSchedules] = useState(classDetails.schedules);
    const subjectMap_ = subjectMap(allSubjects)

    const [day, setDay] = useState('Monday');

    let list = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    function setModal(flag) {
        setIsOpen(flag)
    }

    function setState(data) {
        setClassSubjectList(data.classSubjects);
        setSchedules(data.schedules);
    }

    return (
        <>
            <Head>
                <title>Alpha | Schedule</title>
            </Head>
            <div className="min-h-screen flex">
                <div className="top-0 left-0 sticky h-screen w-[18%]  overflow-x-auto shadow-xl shadow-blue-200">
                    <SidePanel status={0} />
                </div>
                <div className="w-[82%] bg-slate-50">
                    <div className='shadow-md bg-white'>
                        <Navtab />
                    </div>
                    <Link href='/admin/schedule' className='p-2 rounded-lg m-4 font-semibold justify-center items-center bg-slate-200 flex cursor-pointer w-28'><GrPrevious /> <span className='mx-1'>Go Back</span></Link>
                    <header className='flex font-semibold'>
                        <span className='bg-blue-100 text-blue-800 px-4 py-2 mx-4 rounded-3xl'>{classDetails.departmentId.departmentName}</span>
                        <span className='bg-blue-100 text-blue-800 px-4 py-2 rounded-3xl'>{classDetails.className}</span>
                    </header>
                    <div className='w-[95%] mx-auto p-4 text-gray-600 mt-6'>
                        <h1 className="font-semibold text-xl text-gray-600 w-full my-6">Class Subjects</h1>
                        <div className='mx-auto border rounded-2xl shadow-md  bg-white'>
                            <ClassSubjectList classSubjectList={classSubjectList} setState={setState} allSubjects={allSubjects} allTeachers={allTeachers} />
                        </div>
                        <hr className='my-8'></hr>
                        <h1 className="font-semibold text-xl text-gray-600">Time Table</h1>
                        <div className='grid grid-cols-3 gap-4 my-6' >
                            {
                                list.map((day, key) => {

                                    return (
                                        <div key={key} className='border rounded-md px-3 shadow-md bg-white' >
                                            <header className='flex justify-between py-3 text-xl items-center'><span>{day}</span>
                                                <div className='text-xl cursor-pointer ' >
                                                    <RiMenuAddLine></RiMenuAddLine>
                                                </div>
                                            </header>
                                            <section className='py-2'>
                                                {schedules[day].map((lecture, key) => {

                                                    return (
                                                        <div key={key} className={`group relative p-2 text-white font-semibold bg-gradient-to-r from-cyan-500 to-blue-500 cursor-pointer  border-2 border-white rounded-md`}>
                                                            <p>{lecture.from}-{lecture.to} : {subjectMap_[lecture.subjectId]}</p>
                                                            <p>{classSubjectList[lecture.subjectId].subjectTeacher.fname}</p>
                                                            <div className='absolute top-0 right-0 text-white  hidden  h-full w-full text-3xl group-hover:flex group-hover:justify-end group-hover:items-center' style={{ backgroundColor: 'rgba(0,0,0,0.1)' }}>
                                                                <MdSystemUpdateAlt className='hover:text-teal-500' />
                                                                <div className='hover:text-red-500 mx-2'>
                                                                    <MdDeleteOutline className='delete' />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </section>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>

            </div>
            {isOpen && <ScheduleModal isOpen={isOpen} setModal={setModal} day={day} />}

        </>
    )
}

export async function getServerSideProps(context) {
    const cookie = context.req.cookies.auth;

    if (!cookie) {
        return {
            redirect: {
                destination: '/login/admin-login',
                permanent: false,
            },
        };
    }

    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/schedule/class/${context.params.showSchedule}`);

    return {
        props: {
            classDetails: data.classDetails, allSubjects: data.allSubjects, allTeachers: data.allTeachers
        }
    }

}

export default ShowSchedule