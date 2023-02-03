import React, { useState } from 'react'
import Head from "next/head";
import { Navtab } from '../../../components/utility';

import Image from "next/image";
import Link from "next/link";

import { GrPrevious } from "react-icons/gr";

const ShowDetails = () => {
    return (
        <>
            <Head>
                <title>Alpha | Student Details</title>
            </Head>
            <div>
                <div className='shadow-md'>
                    <Navtab />
                </div>
                <Link href='/admin/dashboard' className='p-2 rounded-lg m-4 font-semibold justify-center items-center bg-slate-200 flex cursor-pointer w-28'><GrPrevious /> <span className='mx-1'>Go Back</span></Link>

                <div className='w-5/12 mx-auto my-4 border-2'>

                    <div className='w-[80%] mx-auto my-4'>
                        <div className="w-28 h-28 border mx-auto rounded-full mt-4"></div>
                        <div className=" w-full mb-6 group">
                            <label htmlFor="full-name" className="font-medium">Full Name</label>
                            <input type="text" name="full-name" id="full-name" className=" p-2 border-b-2 block focus:border-blue-500 focus:outline-none w-full" placeholder='eg. Aniket Satish Mane' value={'one'}  required />
                        </div>
                        <div className=" w-full mb-6 group">
                            <label htmlFor="dob" className="font-medium">Date of Birth</label>
                            <input type="date" name="dob" id="dob" className=" p-2 border-b-2 block focus:border-blue-500 focus:outline-none w-full" required />
                        </div>
                        <div className=" w-full mb-6 group">
                            <label htmlFor="email" className="font-medium">Email</label>
                            <input type="email" name="email" id="email" className="p-2 border-b-2 block focus:border-blue-500 focus:outline-none w-full" placeholder='example@email.com' required />
                        </div>
                        <div className="w-full mb-6 group">
                            <label htmlFor="phone" className="font-medium">Phone Number</label>
                            <input type="number" name="email" id="email" className="p-2 border-b-2 block focus:border-blue-500 focus:outline-none w-full" minlength="10" maxlength="10" placeholder='+91 1234567890' required />
                        </div>
                        <div className="w-full mb-6 group">
                            <label htmlFor="regId" className="font-medium">Reg. Id</label>
                            <input type="text" name="regId" id="regId" className="p-2 border-b-2 block focus:border-blue-500 focus:outline-none w-full" minlength="10" maxlength="10" placeholder='S2K2020XXXX' required />
                        </div>
                        <div className="w-full mb-6 group">
                            <label htmlFor="regId" className="font-medium">Reg. Id</label>
                            <input type="text" name="regId" id="regId" className="p-2 border-b-2 block focus:border-blue-500 focus:outline-none w-full" minlength="10" maxlength="10" placeholder='S2K2020XXXX' required />
                        </div>
                        <div className="w-full mb-6 group">
                            <label htmlFor="dept" className="font-medium">Department</label>
                            <input type="text" name="dept" id="dept" className="p-2 border-b-2 block focus:border-blue-500 focus:outline-none w-full" minlength="10" maxlength="10" required />
                        </div>
                        <div className="w-full mb-6 group">
                            <label htmlFor="class_" className="font-medium">Class</label>
                            <input type="text" name="class_" id="class_" className="p-2 border-b-2 block focus:border-blue-500 focus:outline-none w-full" minlength="10" maxlength="10" required />
                        </div>

                    </div>
                </div>

            </div>
        </>
    )
}

export default ShowDetails