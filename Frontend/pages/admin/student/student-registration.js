import React from 'react'
import Head from "next/head";
import Image from "next/image";
import { MainCropper } from '../../../components/admin';
import { ListSelect } from '../../../components/utility';

const studentRegistration = () => {

  const department = [
    { name: 'Electronics and Telecommunication' },
    { name: 'Computer' },
    { name: 'Information Technology' },

  ]

  const class_=[
    { name: 'BE 6' },
    { name: 'BE 7' },
    { name: 'BE 8' },
    { name: 'BE 9' },
  ]
  return (
    <>
      <Head>
        <title>Alpha | Student Registration</title>
      </Head>
      <div className='w-[99%]'>
        <div className='relative text-slate-700 m-20 w-5/12 mx-auto rounded-xl shadow-xl border border-blue-700'>
          <div className="h-16 absolute right-[36%] -top-14 flex items-center mt-4 ml-6 bg-white">
            <div className="h-full w-12 relative">
              <Image src="/logo.png" alt="Picture of the author" layout="fill" />
            </div>
            <h1 className="ml-2 italic font-bold text-3xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-800 to-blue-900">
              Alpha
            </h1>
          </div>
          <h1 className="text-center mt-12 mb-6 text-2xl font-medium">Student Registration Form</h1>
          <form className='w-[80%] mx-auto px-2'>
            <MainCropper />

            <div className=" w-full mb-6 group">
              <label htmlFor="full-name" className="font-medium">Full Name*</label>
              <input type="text" name="full-name" id="full-name" className=" p-2 border-b-2 block focus:border-blue-500 focus:outline-none w-full" placeholder='eg. Aniket Satish Mane' required />
            </div>
            <div className=" w-full mb-6 group">
              <label htmlFor="dob" className="font-medium">Date of Birth*</label>
              <input type="date" name="dob" id="dob" className=" p-2 border-b-2 block focus:border-blue-500 focus:outline-none w-full" required />
            </div>
            <div className=" w-full mb-6 group">
              <label htmlFor="email" className="font-medium">Email*</label>
              <input type="email" name="email" id="email" className="p-2 border-b-2 block focus:border-blue-500 focus:outline-none w-full" placeholder='example@email.com' required />
            </div>
            <div className="w-full mb-6 group">
              <label htmlFor="phone" className="font-medium">Phone Number*</label>
              <input type="number" name="email" id="email" className="p-2 border-b-2 block focus:border-blue-500 focus:outline-none w-full" minlength="10" maxlength="10" placeholder='+91 1234567890' required />
            </div>
            <div className="w-full mb-6 group">
              <label htmlFor="regId" className="font-medium">Reg. Id*</label>
              <input type="text" name="regId" id="regId" className="p-2 border-b-2 block focus:border-blue-500 focus:outline-none w-full" minlength="10" maxlength="10" placeholder='S2K2020XXXX' required />
            </div>

            <div className="w-full mb-6 group">
              <span className="font-medium">Department</span>
              <ListSelect data={department}/>
            </div>

            <div className="w-full mb-6 group">
            
              <span className="font-medium">Class</span>
              <ListSelect data={class_}  />

            </div>

            <button className='px-2 py-3 bg-gradient-to-r from-blue-500 to-indigo-700 w-full rounded-lg text-white mb-12'>Create Student Account</button>
          </form>

        </div>
      </div>

    </>

  )
}

export default studentRegistration;