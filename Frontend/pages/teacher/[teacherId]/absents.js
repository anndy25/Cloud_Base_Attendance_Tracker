import Head from "next/head";
import React, { useState } from "react";
import axios from 'axios';
import Image from "next/image";
import { GrPrevious } from "react-icons/gr";
import { useRouter } from 'next/router'


import { SidePanel, Navtab } from '../../../components/utility';

const Absents = ({ absentStudents, className, subjectName, date }) => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Alpha | Absents Students ({className})</title>
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
            <div className='p-2 rounded-lg mb-4 font-semibold justify-center items-center bg-slate-200 flex cursor-pointer w-28' onClick={() => router.back()}><GrPrevious /> <span className='mx-1'>Go Back</span></div>
            <header className='flex font-semibold my-8'>
              <span className='bg-blue-100 text-blue-800 px-4 py-2 rounded-3xl'>{className}</span>
              <span className='bg-blue-100 text-blue-800 px-4 py-2 rounded-3xl mx-4'>{subjectName}</span>
              <span className='bg-blue-100 text-blue-800 px-4 py-2  rounded-3xl'>{date}</span>
            </header>
            <div className='mx-auto  mb-6 px-4'>
              <h1 className='font-semibold text-xl text-slate-600'>Absents Students : {absentStudents.length}</h1>
              <div className='grid grid-cols-5 gap-x-12 text-slate-700 font-semibold my-4'>
                {
                  absentStudents.map((student, key) => {
                    return (
                      <div className='bg-white shadow-md rounded-xl border h-44 flex flex-col justify-center items-center' key={key}>
                        <Image
                          src={student.image.url}
                          width="120" height="120"
                          className="w-24 h-24 border mx-2 rounded-full" alt='student image' />
                        <p>{student.fname}</p>
                        <small>{student.rollNo}</small>

                      </div>
                    )
                  })
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

  const { date, classId, subjectId } = context.query;

  try {


    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/attendance/absentStudents`, {
      params: { classId, subjectId, date }
    })

    const { absentStudents, className, subjectName } = data;

    return { props: { absentStudents, className, subjectName, date } };

  } catch (err) {

    if (err.response.status === 409) {
      return {
        notFound: true,
      };
    }
  }

}

export default Absents
