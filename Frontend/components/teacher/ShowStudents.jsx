import React from 'react'
import Image from "next/image";
import { useRouter } from 'next/router'
const ShowStudents = ({ studentDetails }) => {
    const router = useRouter();
    const {subjectId}=router.query;

    const { students,totalLecture } = studentDetails

    return (
        <>

            <table className="w-full text-left bg-white">
                <thead className=" text-slate-800">
                    <tr className="bg-indigo-50">
                        <th className="pl-5 py-3 w-1/3">Name</th>
                        <th >Roll No.</th>
                        <th className='w-1/4'>Email</th>
                        <th >Reg. Id</th>
                        <th >Presenty</th>
                    </tr>
                </thead>
                <tbody className='text-slate-600 font-medium'>

                    {
                        students.map((student, key) => {

                            const {attendanceLogs}=student;
                            let presenty=attendanceLogs && attendanceLogs[subjectId] ? attendanceLogs[subjectId].totalAttendance:0;
        

                            return (
                                <tr className=" even:bg-blue-50 hover:text-indigo-600 cursor-pointer" key={key}>

                                    <td className="px-3 py-1 flex items-center ">
                                        <Image
                                            src={student.image.url}
                                            width="120" height="120"
                                            className="w-12 h-12 border mx-2 rounded-full" alt='student image' />
                                        <p>{student.fname}</p>
                                    </td>
                                    <td>{student.rollNo}</td>
                                    <td >{student.email}</td>
                                    <td >{student.regNo}</td>
                                    <td>{presenty}</td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>

        </>
    )
}
export default ShowStudents