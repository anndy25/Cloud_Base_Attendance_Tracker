import React from 'react'
import Image from "next/image";
import { MdDeleteOutline, MdOutlinePersonAddAlt } from "react-icons/md";
import axios from "axios"

const ClassSubjectList = ({ classSubjectList, allSubjects, allTeachers }) => {
    return (
        <>
            <table className="w-full text-left">
                <thead className=" text-slate-800">
                    <tr>
                        <th className="px-4 py-6 w-1/4">Course Name</th>
                        <th className='w-[15%]'>Course Code</th>
                        <th className='w-[15%]'>Semester</th>
                        <th className='w-1/3'>Course Teacher</th>
                        <th >Action</th>
                    </tr>
                </thead>
                <tbody className='text-slate-600 font-medium'>
                    {
                        allSubjects.map((subject, key) => {
                            return (
                                <tr className=" odd:bg-blue-50" key={key}>
                                    <td className="p-3">{subject.subjectName}</td>
                                    <td>{subject.courseCode}</td>
                                    <td>{subject.semester}</td>
                                    <td className='flex items-center p-1'>
                                        {
                                            classSubjectList[subject._id] ?
                                                <>
                                                    <Image
                                                        src={classSubjectList[subject._id].subjectTeacher.image.url}
                                                        width="120" height="120"
                                                        className="w-12 h-12 border mx-2  rounded-full" alt='student image' />
                                                    <p>{classSubjectList[subject._id].subjectTeacher.fname}</p>
                                                </> :
                                                <>
                                                    <p className='my-3'>Teacher is not assigned to course...</p>
                                                </>
                                        }
                                    </td>

                                    {
                                        classSubjectList[subject._id] ?
                                            <>
                                                <td><MdDeleteOutline className='text-3xl cursor-pointer hover:text-red-600' /></td>

                                            </> :
                                            <>
                                                <td><MdOutlinePersonAddAlt className='text-3xl cursor-pointer hover:text-teal-600' /></td>
                                            </>
                                    }
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </>
    )
}

export default ClassSubjectList