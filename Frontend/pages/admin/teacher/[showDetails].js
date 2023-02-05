import React, { useState } from 'react'
import Head from "next/head";
import { Navtab,Diagonal } from '../../../components/utility';

import Image from "next/image";
import Link from "next/link";

import { GrPrevious } from "react-icons/gr";

const ShowDetails = () => {
    let [isOpen, setIsOpen] = useState(false)

    function setModal(flag) {
      setIsOpen(flag)
    }
  
   
    return (
        <>
            <Head>
                <title>Alpha | Student Details</title>
            </Head>

            <div className='shadow-md'>
                <Navtab />
            </div>
            <Link href='/admin/dashboard' className='p-2 rounded-lg m-4 font-semibold justify-center items-center bg-slate-200 flex cursor-pointer w-28'><GrPrevious /> <span className='mx-1'>Go Back</span></Link>

            <div className='w-5/12 mx-auto mt-4 my-8 border-2 border-blue-700 rounded-2xl shadow-md'>

                <div className='w-[80%] mx-auto my-4 caret-transparent py-4 '>
                    <Image src="https://media.npr.org/assets/img/2022/11/08/ap22312071681283-0d9c328f69a7c7f15320e8750d6ea447532dff66.jpg" width="80" height='80' className="w-28 h-28 border mx-auto rounded-full my-4" />
                    <div className=" w-full mb-6 group">
                        <label htmlFor="full-name" className="font-medium">Full Name</label>
                        <input type="text" name="full-name" id="full-name" className=" p-2 border-b-2 block  focus:outline-none w-full" placeholder='eg. Aniket Satish Mane' value={'Aniket Satish Mane'} required />
                    </div>
                    <div className=" w-full mb-6 group">
                        <label htmlFor="dob" className="font-medium">Date of Birth</label>
                        <input type="date" name="dob" id="dob" className=" p-2 border-b-2 block  focus:outline-none w-full" value={'2001-01-01'} required />
                    </div>
                    <div className=" w-full mb-6 group">
                        <label htmlFor="email" className="font-medium">Email</label>
                        <input type="email" name="email" id="email" className="p-2 border-b-2 block  focus:outline-none w-full" value={'aniketsmd310@gmail.com'} required />
                    </div>
                    <div className="w-full mb-6 group">
                        <label htmlFor="phone" className="font-medium">Phone Number</label>
                        <input type="number" name="email" id="email" className="p-2 border-b-2 block  focus:outline-none w-full" minlength="10" maxlength="10" value={'9294556601'} required />
                    </div>
                    <div className="w-full mb-6 group">
                        <label htmlFor="regId" className="font-medium">Reg. Id</label>
                        <input type="text" name="regId" id="regId" className="p-2 border-b-2 block  focus:outline-none w-full" minlength="10" maxlength="10" value={'E2k20206521'} required />
                    </div>

                    <div className="w-full mb-6 group">
                        <label htmlFor="dept" className="font-medium">Department</label>
                        <input type="text" name="dept" id="dept" className="p-2 border-b-2 block  focus:outline-none w-full" minlength="10" maxlength="10" value={'Electronics and Telecommunication'} required />
                    </div>
                    <div className='flex justify-between'>
                        <div className='text-slate w-[70%]'>
                            <h1 className='font-semibold'>Delete this account</h1>
                            <h2 className='text-sm'>Once you delete a account, there is no going back. Please be certain.</h2>
                        </div>
                        <div className='flex items-end'>
                            <button onClick={()=>setIsOpen(true)} className='w-full font-semibold text-sm text-red-600 border-2 px-2 py-3 border-red-600 hover:text-white hover:bg-red-600 rounded-md '>Delete Account</button>
                        </div>
                    </div>
                </div>
            </div>
          {isOpen && <Diagonal isOpen={isOpen} setModal={setModal}/>}
        </>
    )
}

export default ShowDetails