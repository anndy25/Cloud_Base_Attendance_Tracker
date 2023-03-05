import React from 'react'
import Link from "next/link";

const ScheduleTable = ({ classes_, totalStudent }) => {
    return (
        <>
            <table className="w-full text-center">
                <thead className=" text-slate-800">
                    <tr>
                        <th className="p-3 w-1/4">Class</th>
                        <th >Department</th>
                        <th >Semester</th>
                        <th >Strength</th>
                    </tr>
                </thead>
                <tbody className='text-slate-600 font-medium'>
                    {
                        classes_.map((class_, key) => {
                            return (
                                <tr className=" odd:bg-blue-50" key={key}>
                                    <td className="p-3 cursor-pointer hover:text-indigo-700"><Link href={`/admin/schedule/${class_._id}`}>{class_.className}</Link></td>
                                    <td >{class_.departmentId.departmentName}</td>
                                    <td >{class_.semester}</td>
                                    <td >{totalStudent[class_._id] ? totalStudent[class_._id] : '0'}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </>
    )
}

export default ScheduleTable 