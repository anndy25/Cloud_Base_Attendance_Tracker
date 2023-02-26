/* eslint-disable react-hooks/rules-of-hooks */
import React,{useState} from 'react'
import Head from "next/head";
import Image from "next/image";
import axios from 'axios';

import { MainCropper } from '../../../components/admin';
import { ListSelect } from '../../../components/utility';


import { departmentMap, classMap } from "../../../functions/mapping"

const studentRegistration = ({classes,departments}) => {

  const classMap_ = classMap(classes);
  const departmentMap_ = departmentMap(departments);

  const [formData, setFormData] = useState({
    fname: '',
    photo: null,
    email: '',
    phoneNumber: '',
    gender: '',
    rollNo: '',
    dob: '',
    regNo: '',
    semester: '',
    departmentId: '',
    classId: '',
  });






  const handleInputChange = (event) => {
    const { name, value, files } = event.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { fname, email, phoneNumber, dob, photo, gender, regNo, departmentId, classId, rollNo, semester } = formData;

    const data = new FormData();
    data.append('fname', fname);
    data.append('photo', photo);
    data.append('email', email);
    data.append('phoneNumber', phoneNumber);
    data.append('gender', gender);
    data.append('dob', dob);
    data.append('rollNo', rollNo);
    data.append('password', "12345");
    data.append('regNo', regNo);
    data.append('role', 'student');
    data.append('semester', semester);
    data.append('departmentId', departmentId);
    data.append('classId', classId);

  };


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
              <input type="text" name="fname" id="full-name" className=" p-2 border-b-2 block focus:border-blue-500 focus:outline-none w-full" placeholder='eg. Aniket Satish Mane' required />
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
              <input type="number" name="phoneNumber" id="phoneNumber" className="p-2 border-b-2 block focus:border-blue-500 focus:outline-none w-full" placeholder='+91 1234567890' required />
            </div>
            <div className="w-full mb-6 group">
              <label htmlFor="regId" className="font-medium">Reg. Id*</label>
              <input type="text" name="regNo" id="regNo" className="p-2 border-b-2 block focus:border-blue-500 focus:outline-none w-full" placeholder='S2K2020XXXX' required />
            </div>


            <div className="w-full mb-6 group">
              <span className="font-medium">Department</span>
              <ListSelect data={departments} />
            </div>

            <div className="w-full mb-6 group">
              <span className="font-medium">Class</span>
              <ListSelect data={classes} />
            </div>

            <div className="w-full mb-6 group">
              <label htmlFor="rollNo" className="font-medium">Roll Number*</label>
              <input type="text" name="rollNo" id="rollNo" className="p-2 border-b-2 block focus:border-blue-500 focus:outline-none w-full" placeholder='S2K2020XXXX' required />
            </div>

            <div className="w-full mb-6 group">
              <label htmlFor="semester" className="font-medium">Semester*</label>
              <input type="text" name="semester" id="semester" className="p-2 border-b-2 block focus:border-blue-500 focus:outline-none w-full" placeholder='S2K2020XXXX' required />
            </div>

            <button className='px-2 py-3 bg-gradient-to-r from-blue-500 to-indigo-700 w-full rounded-lg text-white mb-12'>Create Student Account</button>
          </form>

        </div>
      </div>

    </>

  )
}

export async function getStaticProps(context) {
  
  const response1 = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/department/getAll`);
  const response2 = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/class/getAll`);

  return {
    props: {

      departments: response1.data.departments,
      classes: response2.data.classes

    },
  };
}


export default studentRegistration;