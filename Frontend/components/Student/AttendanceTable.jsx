import React from 'react'
import { MdSubject } from "react-icons/md";
import { BiBook } from "react-icons/bi";
import { BsPercent } from "react-icons/bs";
import { FaChalkboardTeacher } from "react-icons/fa";
import Image from "next/image";

const Message = ({ Component, title }) => {
    return (
        <>
            <div className='flex items-center justify-center'><Component /><p className='mx-2'>{title}</p></div>
        </>
    )
}

const AttendanceTable = ({ allSubjects, classInfo, attendanceLogs }) => {

    const { classSubjects } = classInfo;


    return (
        <table className="w-full text-left">
            <thead className=" text-slate-700 bg-indigo-50 ">
                <tr>
                    <th className="p-3 w-1/4"><Message Component={BiBook} title='Subject' /></th>
                    <th ><Message Component={MdSubject} title='Attendance' /></th>
                    <th ><Message Component={BsPercent} title='Percentage' /></th>
                    <th ><Message Component={FaChalkboardTeacher} title='Teacher' /></th>
                </tr>
            </thead>
            <tbody className='text-slate-600 font-medium'>
                {allSubjects.map((subject, key) => {

                    let subjectTeacher = { image: "/avatar.webp", fname: "", totalLectures: 0, totalAttendance: 0 }
                    if (classSubjects && classSubjects[subject._id]) {

                        subjectTeacher.totalLectures = classSubjects[subject._id].totalLectures;
                        if (classSubjects[subject._id].subjectTeacher.fname) {
                            subjectTeacher.fname = classSubjects[subject._id].subjectTeacher.fname;
                            subjectTeacher.image = classSubjects[subject._id].subjectTeacher.image.url;
                        }

                        if (attendanceLogs[subject.id]) {
                            subjectTeacher.totalAttendance = attendanceLogs[subject.id].totalAttendance
                        }


                    }
                    return (

                        <tr className=" even:bg-indigo-50" key={key}>
                            <td className="p-3">{subject.subjectName}</td>
                            <td >{subjectTeacher.totalAttendance}/{subjectTeacher.totalLectures}</td>
                            <td >75%</td>
                            <td className="cursor-pointer flex  items-center ">
                                <div className='w-3/4 py-1.5 my-1 bg-white flex items-center border-2 rounded-md'>
                                    <Image
                                        src={subjectTeacher.image}
                                        width="120" height="120"
                                        className="w-8 h-8 border mx-2 rounded-full " alt='student image' />
                                    <span className='text-sm'>{subjectTeacher.fname}</span>
                                </div>
                            </td>
                        </tr>
                    )
                })}

            </tbody>
        </table>
    )
}

export default AttendanceTable
