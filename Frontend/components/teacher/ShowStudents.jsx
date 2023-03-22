import React from 'react'
import Image from "next/image";

const ShowStudents = ({ studentDetails }) => {

    const { students, tLecture, attendanceMap } = studentDetails

    return (
        <>

            <table className="w-full text-center bg-white">
                <thead className=" text-slate-800">
                    <tr className="bg-indigo-50">
                        <th className="p-3 w-1/4">Name</th>
                        <th >Roll No.</th>
                        <th >Email</th>
                        <th >Reg. Id</th>
                        <th >Presenty</th>
                    </tr>
                </thead>
                <tbody className='text-slate-600 font-medium'>

                    {
                        students.map((student, key) => {

                            let presenty = attendanceMap[student._id] ? (attendanceMap[student._id] / tLecture.length) * 100 : 0;
                            presenty = Number(presenty.toFixed(2));

                            return (
                                <tr className=" even:bg-blue-50 hover:text-indigo-600 cursor-pointer" key={key}>

                                    <td className="px-2 py-1 flex items-center ">
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