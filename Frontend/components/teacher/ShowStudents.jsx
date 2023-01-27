import React from 'react'
import { TbNumbers } from "react-icons/tb";
import { SiNamecheap } from "react-icons/si";
import { MdOutlineMailOutline } from "react-icons/md";
import { BsFillFileSpreadsheetFill } from "react-icons/bs";
import { CiViewList } from "react-icons/ci";

const Message = ({ Component, title }) => {
    return (<>
        <div className='flex items-center justify-center'><Component /><p className='mx-2'>{title}</p></div>
    </>)
}
const ShowStudents = () => {
    return (
        <>
            
                <table className="w-full text-center">
                    <thead className=" text-slate-800">
                        <tr>
                            <th className="p-3"><Message Component={SiNamecheap} title='Name' /></th>
                            <th ><Message Component={TbNumbers} title='Roll No.' /></th>
                            <th ><Message Component={MdOutlineMailOutline} title='Email' /></th>
                            <th ><Message Component={BsFillFileSpreadsheetFill} title='Presenty' /></th>
                            <th ><Message Component={CiViewList} title='Absent Days' /></th>
                        </tr>
                    </thead>
                    <tbody className='text-slate-600 font-medium'>

                        <tr
                            className=" even:bg-blue-50"
                        >
                            <td className="p-3 cursor-pointer flex  items-center ">
                                <div className="w-12 h-12 rounded-full border-2  mr-2"></div>
                                <span>Aniket Mane</span>
                            </td>
                            <td>42335</td>
                            <td >aniketsmd310@gmail.com</td>
                            <td >87%</td>
                            <td className='cursor-pointer'> View </td>
                        </tr>
                        <tr
                            className=" even:bg-blue-50"
                        >
                            <td className="p-3  cursor-pointer flex  items-center ">
                                <div className="w-12 h-12 rounded-full border-2  mr-2"></div>
                                <span>Aniket Mane</span>
                            </td>
                            <td>42335</td>
                            <td >aniketsmd310@gmail.com</td>
                            <td >87%</td>
                            <td className='cursor-pointer'> View </td>
                        </tr>


                    </tbody>
                </table>
            
        </>
    )
}
export default ShowStudents