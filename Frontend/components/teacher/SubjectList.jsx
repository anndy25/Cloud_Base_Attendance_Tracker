import React from 'react'
import Link from "next/link";
import { TbBooks } from "react-icons/tb";
import { SiGoogleclassroom } from "react-icons/si";


const SubjectList = ({ lectures, teacherId }) => {
  let list = ['bg-sky-500', 'blue', 'indigo', 'cyan', 'purple']

  return (
    <>
      <div className='grid grid-cols-3 gap-4  text-white font-semibold'>
        {
          lectures.map((lecture, key) => {
            return (

              <div className={`h-40 rounded-md shadow-md bg-indigo-500  border-2  p-4 relative`} key={key}>
                <h1 className='flex items-center'><TbBooks /> <span className='mx-2 truncate'>{lecture.subjectId.subjectName}</span></h1>
                <h1 className='flex items-center text-sm'><SiGoogleclassroom /> <span className='mx-2 my-1'>Class {lecture.classId.className}</span></h1>
                <h1 className='flex items-center text-sm'><SiGoogleclassroom /> <span className='mx-2'>Total Students : 60</span></h1>
                <Link href={`/teacher/${teacherId}/lecture?classId=${lecture.classId._id}&subjectId=${lecture.subjectId._id}`} className='absolute right-4 bottom-4 border-2 py-2 px-4 rounded-md' style={{ backgroundColor: "rgba(255,255,255,.2)" }}>View</Link>
              </div>

            )
          })
        }
      </div>
    </>
  )
}

export default SubjectList