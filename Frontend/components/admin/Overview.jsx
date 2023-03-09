import React from 'react'
import { BsFillPeopleFill } from "react-icons/bs";
import { FaChalkboardTeacher } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";

const Overview = ({students,teachers}) => {
    return (
        <>
            <div className='border w-1/4 flex items-center justify-evenly shadow-md py-4 rounded-xl bg-white'>
                <div className=' text-white font-bold p-5 bg-gradient-to-t from-cyan-200 to-cyan-500 text-4xl rounded-3xl'>
                    <BsFillPeopleFill />
                </div>
                <div className="ml-2">
                    <h5 className='text-slate-500 font-bold'>Students</h5>
                    <h3 className='text-3xl font-bold'>{students.length}</h3>
                </div>
            </div>
            <div className='border w-1/4 flex items-center justify-evenly shadow-md py-4 rounded-xl bg-white'>
                <div className='text-white font-bold p-5 bg-gradient-to-t from-amber-200 to-amber-500 text-4xl rounded-3xl'>
                    <FaChalkboardTeacher />
                </div>
                <div className="ml-2">
                    <h5 className='text-slate-500 font-bold'>Teacher</h5>
                    <h3 className='text-3xl font-bold'>{teachers.length}</h3>
                </div>
            </div>
            <div className='border w-1/4 flex items-center justify-evenly shadow-md py-4 rounded-xl bg-white'>
                <div className='text-white font-bold p-5 bg-gradient-to-t from-teal-200 to-teal-500 text-4xl rounded-3xl'>
                    <IoIosPeople />
                </div>
                <div className="ml-2">
                    <h5 className='text-slate-500 font-bold'>Staff</h5>
                    <h3 className='text-3xl font-bold'>25</h3>
                </div>
            </div>
        </>
    )
}

export default Overview