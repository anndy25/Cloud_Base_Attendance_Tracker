import React from 'react';
import Head from "next/head";
import axios from "axios"
import { SidePanel, Navtab, Calender, LineChart, ScheduleCard } from '../../../components/utility';
import { SubjectList } from "../../../components/teacher";

const dashboard = ({ schedules, lectures, teacherId }) => {

    return (
        <>
            <Head>
                <title>Alpha | Teacher Dashboard</title>
            </Head>
            <div className='min-h-screen flex justify-center'>
                <div className="top-0 left-0 sticky h-screen w-[18%]  overflow-x-auto shadow-xl shadow-blue-200">
                    <SidePanel status={2} />
                </div>
                <div className='w-[82%] '>
                    <div className='shadow-md bg-white'>
                        <Navtab />
                    </div>
                    <div className='flex'>
                        <section className='w-[74%] py-12 flex flex-col items-center'>
                            <div className='w-11/12 mx-auto shadow-md rounded-xl border mb-4'>
                                <h1 className="font-bold text-lg text-gray-600 px-4 mt-4">Attendace Overview</h1>
                                <LineChart />
                            </div>
                            <div className="py-3">
                                <h1 className="font-bold text-xl text-gray-600 mb-6 ">Subjects</h1>
                                <SubjectList teacherId={teacherId} lectures={lectures} />
                            </div>
                        </section>
                        <aside className='w-[26%]  py-12 pr-4'>
                            <div className=''>
                                <Calender />
                            </div>
                            <div className='shadow-md p-3 rounded-md my-2 border'>
                                <h1 className="text-lg my-2">{`Today's Schedule`}</h1>
                                <ScheduleCard schedules={schedules} />
                            </div>
                        </aside>
                    </div>
                </div>
            </div>
        </>
    )
}

export async function getStaticPaths() {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/users/allTeachers`);
    return {
        paths: data.teachers.map((teacher) => ({
            params: { teacherId: teacher._id },
        })),
        fallback: "blocking",
    };

}


export async function getStaticProps(context) {

    const { teacherId } = context.params;

    const dayName = { 0: "sunday", 1: "monday", 2: "tuesday", 3: "wednesday", 4: "thursday", 5: "friday", 6: "saturday" };
    const day = dayName[new Date().getDay()];

    try {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/overview/teacher/${teacherId}?day=${day}`)
        if (!data) {
            return {
                notFound: true,
            };
        }

        return { props: { schedules: data.schedules[day], lectures: data.lectures, teacherId: data._id }, revalidate: 20, };

    } catch (err) {
        return {
            notFound: true,
        };
    }

}


export default dashboard
