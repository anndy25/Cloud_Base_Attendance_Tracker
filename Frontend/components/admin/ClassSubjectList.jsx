import React, { useState } from 'react'
import Image from "next/image";
import { MdDeleteOutline, MdOutlinePersonAddAlt } from "react-icons/md";
import ListSelect from './ListSelect';
import axios from "axios"

const ClassSubjectList = ({ classSubjectList, allSubjects, allTeachers, setState }) => {



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
                                    <td className='text-slate-800'>
                                        {
                                            classSubjectList[subject._id] ?
                                                <div className='w-3/4 py-1.5 my-1 bg-white flex items-center border-2 rounded-md'>
                                                    <Image
                                                        src={classSubjectList[subject._id].subjectTeacher.image.url}
                                                        width="120" height="120"
                                                        className="w-8 h-8 border mx-2 rounded-full " alt='student image' />
                                                    <span className='text-sm'>{classSubjectList[subject._id].subjectTeacher.fname}</span>
                                                </div> :

                                                <div className='w-3/4 my-1'>
                                                    <ListSelect teachers={allTeachers} />
                                                </div>

                                        }
                                    </td>

                                    {
                                        classSubjectList[subject._id] ?
                                            <>
                                                <td><MdDeleteOutline className='text-3xl cursor-pointer hover:text-red-600' /></td>
                                            </> :
                                            <>
                                                <td><MdOutlinePersonAddAlt className='text-3xl cursor-pointer hover:text-green-600' /></td>
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