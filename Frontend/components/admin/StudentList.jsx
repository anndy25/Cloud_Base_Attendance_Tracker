import React from 'react'
import Image from "next/image";
import { useRouter } from 'next/router';

const StudentList = ({ students }) => {
    const router = useRouter();

    return (
        <>

            <table className="w-full text-left">
                <thead className=" text-slate-700">
                    <tr className='bg-indigo-50'>
                        <th className="p-3 w-[25%]">Name</th>
                        <th className='w-[15%]'>Reg. Id</th>
                        <th className='w-[30%]'>Department</th>
                        <th className='w-[8%]'>Class</th>
                        <th >Email Id</th>
                    </tr>
                </thead>
                <tbody className='text-slate-600 font-medium'>

                    {
                        students.map((student, key) => {
                            return (
                                <tr className=" even:bg-indigo-50 cursor-pointer hover:text-indigo-600" key={key} onClick={() => router.push(`/admin/student/${student._id}`)}>
                                    <td className="p-1 flex  items-center ">
                                        <Image
                                            src={student.image.url}
                                            width="120" height="120"
                                            className="w-12 h-12 border mx-2 rounded-full" alt='student image' />
                                        <p>{student.fname}</p>
                                    </td>
                                    <td>{student.regNo}</td>
                                    <td >{student.departmentId.departmentName}</td>
                                    <td >{student.classId.className}</td>
                                    <td >{student.email}</td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>
        </>
    )
}

export default StudentList