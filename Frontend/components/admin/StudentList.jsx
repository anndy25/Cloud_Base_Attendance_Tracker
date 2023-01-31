import React from 'react'
import { DropDownMenu } from '../utility'

const StudentList = () => {
    return (
        <>
           
            <table className="w-full text-left">
                <thead className=" text-slate-700">
                    <tr>
                        <th className="p-3 w-[26%]">Name</th>
                        <th className='w-[15%]'>Reg. Id</th>
                        <th className='w-[16%]'>Department</th>
                        <th className='w-[13%]'>Class</th>
                        <th >Email Id</th>
                    </tr>
                </thead>
                <tbody className='text-slate-600 font-medium'>

                    <tr
                        className=" odd:bg-blue-50"
                    >
                        <td className="p-1 cursor-pointer flex  items-center ">
                            <div className="w-12 h-12 rounded-full border-2  mr-2"></div>
                            <span>Aniket Mane</span>
                        </td>
                        <td>E2k20206521</td>
                        <td >Computer Eng.</td>
                        <td >BE 7</td>
                        <td >aniketsmd310@gmail.com</td>
                    </tr>
                    <tr
                        className=" odd:bg-blue-50"
                    >
                        <td className="p-1 cursor-pointer flex  items-center ">
                            <div className="w-12 h-12 rounded-full border-2  mr-2"></div>
                            <span>Aniket Mane</span>
                        </td>
                        <td>E2k20206521</td>
                        <td >E&Tc Eng.</td>
                        <td >BE 7</td>
                        <td >aniketsmd310@gmail.com</td>
                    </tr>
                    <tr
                        className=" odd:bg-blue-50"
                    >
                        <td className="p-1 cursor-pointer flex  items-center ">
                            <div className="w-12 h-12 rounded-full border-2  mr-2"></div>
                            <span>Aniket Mane</span>
                        </td>
                        <td>E2k20206521</td>
                        <td >E&Tc Eng.</td>
                        <td >BE 7</td>
                        <td >aniketsmd310@gmail.com</td>
                    </tr>

                </tbody>
            </table>
        </>
    )
}

export default StudentList