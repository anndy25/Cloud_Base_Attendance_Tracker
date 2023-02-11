import React  from 'react'
import { MdSubject } from "react-icons/md";
import { BiBook } from "react-icons/bi";
import { BsPercent } from "react-icons/bs";
import { FaChalkboardTeacher } from "react-icons/fa";

import Image from "next/image";

const Message = ({ Component, title }) => {
    return (<>
        <div className='flex items-center justify-center'><Component /><p className='mx-2'>{title}</p></div>
    </>)
}

const AttendanceTable = () => {
    return ( 
            <table className="w-full text-center">
                <thead className=" text-slate-800">
                    <tr>
                        <th className="p-3"><Message Component={BiBook} title='Subject' /></th>
                        <th ><Message Component={MdSubject} title='Attendance' /></th>
                        <th ><Message Component={BsPercent} title='Percentage' /></th>
                        <th ><Message Component={FaChalkboardTeacher} title='Teacher' /></th>
                    </tr>
                </thead>
                <tbody className='text-slate-600 font-medium'>

                    <tr
                        className=" odd:bg-blue-50"
                    >
                        <td className="p-4">JavaScript</td>
                        <td >3/4</td>

                        <td >
                            75%
                        </td>
                        <td className="cursor-pointer flex  items-center ">
                        <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrQMFCDbUoSb21vj0jVEdBIjm3qdKUGbFjXIwf3GFKXg8b21mobjZpR1iUlPIgw_LXh40&usqp=CAU" width="120" height='120' className="w-12 h-12 border mx-2 rounded-full" />
                            <span>Anjali Patel</span>
                        </td>
                    </tr>
                    <tr
                        className=" odd:bg-blue-50"
                    >
                        <td className="p-4">Radiation & Microwave Theory</td>
                        <td >8/8</td>

                        <td >
                            100%
                        </td>
                        <td className="cursor-pointer flex items-center p-1">
                        <Image src="https://media.npr.org/assets/img/2022/11/08/ap22312071681283-0d9c328f69a7c7f15320e8750d6ea447532dff66.jpg" width="80" height='80' className="w-12 h-12 border  mx-2 rounded-full" />
                            <span>Rakesh Sharma</span>
                        </td>
                    </tr>
                    <tr
                        className=" odd:bg-blue-50"
                    >
                        <td className="p-4">VLSI Design and Technology </td>
                        <td >4/8</td>

                        <td >
                            50%
                        </td>
                        <td className="cursor-pointer flex items-center p-1">
                        <Image src="https://scpr.brightspotcdn.com/dims4/default/43d84fe/2147483647/strip/true/crop/4032x3024+0+0/resize/1760x1320!/format/webp/quality/90/?url=https%3A%2F%2Fa.scpr.org%2F221590_d56474c5314a9b13f79227026a1e73ef_original.jpg" width="80" height='80' className="w-12 h-12 border  mx-2 rounded-full" />
                            <span>Ajit Patel</span>
                        </td>
                    </tr>
                   

                </tbody>
            </table>
        
    )
}

export default AttendanceTable