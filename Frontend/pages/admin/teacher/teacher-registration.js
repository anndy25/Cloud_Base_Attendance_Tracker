/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import { GrPrevious } from "react-icons/gr";
import Swal from "sweetalert2";
import { MainCropper } from "../../../components/admin";
import { departmentMap } from "../../../functions/mapping";

const options = {
  position: "top-center",
  autoClose: 2000,
  hideProgressBar: true,
  closeOnClick: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
};

const teacherRegistration = ({ departments }) => {
  const router = useRouter();

  const departmentMap_ = departmentMap(departments);

  const [formData, setFormData] = useState({
    fname: "",
    photo: null,
    email: "",
    phoneNumber: "",
    gender: "",
    dob: "",
    regNo: "",
    departmentId: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleInputImageChange = (image) => {
    setFormData((prevState) => ({
      ...prevState,
      photo: image,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const {
      fname,
      email,
      phoneNumber,
      dob,
      photo,
      gender,
      regNo,
      departmentId,
    } = formData;

    const data = new FormData();
    data.append("fname", fname);
    data.append("photo", photo[0].file);
    data.append("email", email);
    data.append("phoneNumber", phoneNumber);
    data.append("gender", gender);
    data.append("dob", dob);
    data.append("password", "12345");
    data.append("regNo", regNo);
    data.append("role", "teacher");
    data.append("departmentId", departmentMap_.get(departmentId));

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/registration`,
        data,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      await axios.post(
        `/api/revalidateUser?role=teacher&id=${response.data.id}`
      );

      if (response.status === 201) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: response.data.message,
          showConfirmButton: false,
          timer: 2500,
        });
        router.reload();
      } else {
        toast.warn("Server error!", options);
      }
    } catch (error) {
      if (error.response.status === 401) {
        toast.error(error.response.data.error, options);
      } else {
        toast.error("Server error!", options);
      }
    }
  };

  return (
    <>
      <Head>
        <title>Alpha | Teacher Registration</title>
      </Head>
      <Link
        href="/admin/dashboard"
        className="p-2 rounded-lg m-4 font-semibold justify-center items-center bg-slate-200 flex cursor-pointer w-28"
      >
        <GrPrevious /> <span className="mx-1">Go Back</span>
      </Link>
      <div className="w-[99%]">
        <div className="relative text-slate-700 m-8 w-5/12 mx-auto rounded-xl shadow-xl border border-blue-700">
          <div className="h-16 absolute right-[36%] -top-14 flex items-center mt-4 ml-6 bg-white">
            <div className="h-full w-12 relative">
              <Image
                src="/logo.png"
                alt="Picture of the author"
                layout="fill"
              />
            </div>
            <h1 className="ml-2 italic font-bold text-3xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-800 to-blue-900">
              Alpha
            </h1>
          </div>
          <h1 className="text-center mt-12 mb-6 text-2xl font-medium">
            Teacher Registration Form
          </h1>
          <form className="w-[80%] mx-auto px-2" onSubmit={handleSubmit}>
            <MainCropper
              handleInputImageChang={handleInputImageChange}
              photo={formData.photo}
            />

            <div className=" w-full mb-6 group">
              <label htmlFor="full-name" className="font-medium">
                Full Name*
              </label>
              <input
                type="text"
                name="fname"
                id="full-name"
                className=" p-2 border-b-2 block focus:border-blue-500 focus:outline-none w-full"
                placeholder="eg. Aniket Satish Mane"
                onChange={handleInputChange}
                value={formData.fname}
                required
              />
            </div>
            <div className="w-full mb-6 group">
              <span className="font-medium">Gender*</span>
              <select
                name="gender"
                className="p-2 border-b-2 block  focus:outline-none w-full"
                onChange={handleInputChange}
                required
              >
                <option disabled selected value>
                  {" "}
                  -- select a gender --{" "}
                </option>
                <option>male</option>
                <option>female</option>
              </select>
            </div>
            <div className=" w-full mb-6 group">
              <label htmlFor="dob" className="font-medium">
                Date of Birth*
              </label>
              <input
                type="date"
                name="dob"
                id="dob"
                className=" p-2 border-b-2 block focus:border-blue-500 focus:outline-none w-full"
                onChange={handleInputChange}
                value={formData.dob}
                required
              />
            </div>
            <div className=" w-full mb-6 group">
              <label htmlFor="email" className="font-medium">
                Email*
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="p-2 border-b-2 block focus:border-blue-500 focus:outline-none w-full"
                placeholder="example@email.com"
                onChange={handleInputChange}
                value={formData.email}
                required
              />
            </div>
            <div className="w-full mb-6 group">
              <label htmlFor="phone" className="font-medium">
                Phone Number*
              </label>
              <input
                type="number"
                name="phoneNumber"
                id="phoneNumber"
                className="p-2 border-b-2 block focus:border-blue-500 focus:outline-none w-full"
                placeholder="+91 1234567890"
                onChange={handleInputChange}
                value={formData.phoneNumber}
                required
              />
            </div>
            <div className="w-full mb-6 group">
              <label htmlFor="regId" className="font-medium">
                Reg. Id*
              </label>
              <input
                type="text"
                name="regNo"
                id="regNo"
                className="p-2 border-b-2 block focus:border-blue-500 focus:outline-none w-full"
                placeholder="S2K2020XXXX"
                onChange={handleInputChange}
                value={formData.regNo}
                required
              />
            </div>

            <div className="w-full mb-6 group">
              <span className="font-medium">Department</span>
              <select
                name="departmentId"
                className="p-2 border-b-2 block  focus:outline-none w-full"
                onChange={handleInputChange}
              >
                <option disabled selected value>
                  {" "}
                  -- select a department --{" "}
                </option>
                {departments.map((department, key) => {
                  return <option key={key}>{department.departmentName}</option>;
                })}
              </select>
            </div>

            <button className="px-2 py-3 bg-indigo-600 w-full rounded-lg text-white mb-12">
              Create Teacher Account
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export async function getStaticProps(context) {
  const response1 = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/department/getAll`
  );

  return {
    props: {
      departments: response1.data.departments,
    },
  };
}

export default teacherRegistration;
