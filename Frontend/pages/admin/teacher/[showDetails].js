import React from 'react'
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import axios from 'axios';
import Swal from "sweetalert2";
import { useRouter } from 'next/router';
import { GrPrevious } from "react-icons/gr";

import { Navtab } from '../../../components/utility';
import { formatDate } from "../../../functions/addTime"

const ShowDetails = ({ teacher }) => {
    const router = useRouter();
    async function deleteUser() {
        Swal.fire({
            title: `<small>Do you want to delete "${teacher.fname}'s" account<small>`,
            showCancelButton: true,
            cancelButtonColor: "green",
            cancelButtonText: "No, cancel!",
            confirmButtonText: "Yes, delete it!",
            confirmButtonColor: "red",
        }).then(async (result) => {
            if (result.isConfirmed) {

                try {
                    await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/users/teacher/${teacher._id}`);
                    const response = await axios.post(`/api/revalidateUser?role=teacher&id=${teacher._id}`);
                    if (response.status === 201) {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Teacher account deleted!',
                            showConfirmButton: false,
                            timer: 2000
                        })
                        timeOut(2500)
                    }
                } catch (err) {
                    console.log(err);
                }

            }
        })

    }

    function timeOut(timer) {
        setTimeout(() => { location.replace('/admin/dashboard'); }, timer);
    }

    return (
        <>
            <Head>
                <title>Alpha | {teacher.fname}</title>
            </Head>
            <div className='bg-slate-50'>
                <div className='shadow-md bg-white'>
                    <Navtab />
                </div>

                <Link href='/admin/dashboard' className='p-2 rounded-lg  font-semibold justify-center items-center bg-slate-200 flex cursor-pointer w-28 m-8'><GrPrevious /> <span className='mx-1'>Go Back</span></Link>

                <div className='w-5/12 mx-auto mb-6 border-2 bg-white border-indigo-700 rounded-2xl shadow-md'>

                    <div className='w-[80%] mx-auto my-4 caret-transparent py-4 '>
                        <Image src={teacher.image.url} width="120" height='120' className="w-28 h-28 border mx-auto rounded-full my-4" alt='teacher photo' />
                        <div className=" w-full mb-6 group">
                            <label htmlFor="full-name" className="font-medium">Full Name</label>
                            <input type="text" name="full-name" id="full-name" className=" p-2 border-b-2 block  focus:outline-none w-full" placeholder='eg. Aniket Satish Mane' value={teacher.fname} />
                        </div>
                        <div className=" w-full mb-6 group">
                            <label htmlFor="dob" className="font-medium">Date of Birth</label>
                            <input type="date" name="dob" id="dob" className=" p-2 border-b-2 block  focus:outline-none w-full" value={formatDate(teacher.dob)} />
                        </div>
                        <div className=" w-full mb-6 group">
                            <label htmlFor="email" className="font-medium">Email</label>
                            <input type="email" name="email" id="email" className="p-2 border-b-2 block  focus:outline-none w-full" value={teacher.email} />
                        </div>
                        <div className="w-full mb-6 group">
                            <label htmlFor="phone" className="font-medium">Phone Number</label>
                            <input type="number" name="email" id="email" className="p-2 border-b-2 block  focus:outline-none w-full" value={teacher.phoneNumber} />
                        </div>
                        <div className="w-full mb-6 group">
                            <label htmlFor="regId" className="font-medium">Reg. Id</label>
                            <input type="text" name="regId" id="regId" className="p-2 border-b-2 block  focus:outline-none w-full" value={teacher.regNo} />
                        </div>

                        <div className="w-full mb-6 group">
                            <label htmlFor="dept" className="font-medium">Department</label>
                            <input type="text" name="dept" id="dept" className="p-2 border-b-2 block  focus:outline-none w-full" value={teacher.departmentId.departmentName} />
                        </div>
                        <div className='flex justify-between'>
                            <div className='text-slate w-[70%]'>
                                <h1 className='font-semibold'>Delete this account</h1>
                                <h2 className='text-sm'>Once you delete a account, there is no going back. Please be certain.</h2>
                            </div>
                            <div className='flex items-end'>
                                <button onClick={deleteUser} className='w-full font-semibold text-sm text-red-600 border-2 px-2 py-3 border-red-600 hover:text-white hover:bg-red-600 rounded-md '>Delete Account</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export async function getStaticPaths() {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/users/allTeachers`);
    return {
        paths: data.teachers.map((teacher) => ({
            params: { showDetails: teacher._id },
        })),
        fallback: "blocking",
    };
    
}

export async function getStaticProps({ params }) {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/users/teacher/${params.showDetails}`);

    const { teacher } = data;

    if (!teacher) {
        return {
            notFound: true,
        };
    }
    return {
        props: {
            teacher,
        },

    };
}

export default ShowDetails