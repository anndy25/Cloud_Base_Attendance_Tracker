import React from 'react'
import { DropDownMenu } from '../utility'

const StudentList = ({ students }) => {
    return (
        <>

            <table className="w-full text-left">
                <thead className=" text-slate-700">
                    <tr>
                        <th className="p-3 w-[26%]">Name</th>
                        <th className='w-[30%]'>Reg. Id</th>
                        <th className='w-[30%]'>Department</th>
                        <th className=''>Class</th>
                        <th >Email Id</th>
                    </tr>
                </thead>
                <tbody className='text-slate-600 font-medium'>

                    {
                        students.map((student, key) => {
                            return (

                                <tr className=" odd:bg-blue-50" key={key}>
                                    <td className="p-1 cursor-pointer flex  items-center ">
                                        <div className="w-12 h-12 rounded-full border-2  mr-2"></div>
                                        <span>{student.fname}</span>
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