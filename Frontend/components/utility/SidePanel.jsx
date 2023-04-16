import React from 'react'
import Swal from "sweetalert2";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import { RxDashboard } from "react-icons/rx";
import { BsClockHistory } from "react-icons/bs";
import { AiOutlineSchedule } from "react-icons/ai";
import { logout } from '../../functions/localStrorage';


const listOptions = (flag = 0, pathname, query) => {

    if (flag === 1) {
        return (
            <>
                <Link href={`/student/${query.studentId}`} className={`pl-6 border-r-4  flex items-center py-2 ${pathname == '/student/[studentId]' ? "bg-indigo-100  text-indigo-600 border-indigo-600" : "bg-white "}`}>
                    <RxDashboard className="mr-3" />
                    Dashboard
                </Link>
                <Link href={`/student/${query.studentId}/attendance`} className={`my-1 pl-6 border-r-4 flex items-center py-2 ${pathname == '/student/[studentId]/attendance' ? "bg-indigo-100 text-indigo-600 border-indigo-600" : "bg-white"}`} >
                    <BsClockHistory className="mr-3" />
                    Attendance
                </Link>

            </>
        )
    }
    else if (flag === 2) {

        return (
            <>
                <Link href='/teacher/dashboard' className={`pl-6 border-r-4  flex items-center py-2  bg-indigo-100  text-indigo-600 border-indigo-600`}>
                    <RxDashboard className="mr-3" />
                    Dashboard
                </Link>
            </>
        )
    }

    else if (flag === 3) {
        return (
            <>
                <Link href='/admin/dashboard' className={`pl-6 border-r-4  flex items-center py-2 ${pathname == '/admin/dashboard' ? "bg-indigo-100  text-indigo-600 border-indigo-600" : "bg-white "}`}>
                    <RxDashboard className="mr-3" />
                    Dashboard
                </Link>
                <Link href='/admin/schedule' className={`my-1 pl-6 border-r-4 flex items-center py-2 ${pathname == '/admin/schedule' ? "bg-indigo-100 text-indigo-600 border-indigo-600" : "bg-white"}`}>
                    <AiOutlineSchedule className="mr-3" />
                    Schedule
                </Link>

            </>
        )

    }
    return ''
}

const SidePanel = ({ status }) => {
    const router = useRouter();
    const query = router.query;

    return (
        <>
            <div className="h-full flex flex-col border-r">
                <div className="h-16 flex items-center mt-4 ml-6">
                    <div className="h-full w-12 relative">
                        <Image src="/logo.png" alt="Picture of the author" layout="fill" />
                    </div>
                    <h1 className="ml-3 italic font-bold text-3xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-800 to-indigo-900">
                        Alpha
                    </h1>
                </div>
                <div className="mt-12 font-semibold text-gray-800">
                    {listOptions(status, router.pathname, query)}
                </div>


                <button
                    className="p-2 mt-auto w-6/12 ml-4 my-4 rounded-lg text-indigo-600 border-2 border-indigo-600  space-x-1 hover:bg-indigo-600 hover:text-white hover:border-indigo-700 whitespace-nowrap font-medium "
                    onClick={() =>
                        Swal.fire({
                            icon: "warning",
                            iconColor: "purple",
                            title: "<small>Do you want to Log Out?</small>",
                            showCancelButton: true,
                            cancelButtonColor: "green",
                            cancelButtonText: "No, cancel!",
                            confirmButtonText: "Yes, logout it!",
                            confirmButtonColor: "red",
                        }).then(async (result) => {
                            if (result.isConfirmed) {
                                logout();
                                router.push('/');
                            }
                        })
                    }
                >
                    <p>Log Out</p>
                </button>
            </div>
        </>
    );


}

export default SidePanel