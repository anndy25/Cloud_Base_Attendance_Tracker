import React from 'react'
import Swal from "sweetalert2";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import { RxDashboard } from "react-icons/rx";
import { BsClockHistory } from "react-icons/bs";
import { AiOutlineSchedule } from "react-icons/ai";
import { logout } from '../../functions/localStrorage';


const listOptions = (flag = 0, pathname) => {

    if (flag === 1) {
        return (
            <>
                <Link href='/student/dashboard' className={`pl-6 border-r-4  flex items-center py-2 ${pathname == '/student/dashboard' ? "bg-blue-100  text-blue-800 border-blue-900" : "bg-white "}`}>
                    <RxDashboard className="mr-3" />
                    Dashboard
                </Link>
                <Link href='/student/attendance' className={`my-1 pl-6 border-r-4 flex items-center py-2 ${pathname == '/student/attendance' ? "bg-blue-100 text-blue-800 border-blue-900" : "bg-white"}`}>
                    <BsClockHistory className="mr-3 text-2xl" />
                    Attendance
                </Link>

            </>
        )
    }
    else if (flag === 2) {

        return (
            <>
                <Link href='/teacher/dashboard' className={`pl-6 border-r-4  flex items-center py-2 ${pathname == '/teacher/dashboard' ? "bg-blue-100  text-blue-800 border-blue-900" : "bg-white "}`}>
                    <RxDashboard className="mr-3" />
                    Dashboard
                </Link>
            </>
        )
    }

    else if (flag === 3) {
        return (
            <>
                <Link href='/admin/dashboard' className={`pl-6 border-r-4  flex items-center py-2 ${pathname == '/admin/dashboard' ? "bg-blue-100  text-blue-800 border-blue-900" : "bg-white "}`}>
                    <RxDashboard className="mr-3" />
                    Dashboard
                </Link>
                <Link href='/admin/schedule' className={`my-1 pl-6 border-r-4 flex items-center py-2 ${pathname == '/admin/schedule' ? "bg-blue-100 text-blue-800 border-blue-900" : "bg-white"}`}>
                    <AiOutlineSchedule className="mr-3 text-blue-700" />
                    Schedule
                </Link>

            </>
        )

    }
    return ''
}

const SidePanel = ({ status }) => {
    const router = useRouter();
    return (
        <>
            <div className="h-full flex flex-col border-r">
                <div className="h-16 flex items-center mt-4 ml-6">
                    <div className="h-full w-12 relative">
                        <Image src="/logo.png" alt="Picture of the author" layout="fill" />
                    </div>
                    <h1 className="ml-3 italic font-bold text-3xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-800 to-blue-900">
                        Alpha
                    </h1>
                </div>
                <div className="mt-12 font-semibold text-gray-800">
                    {listOptions( status ,router.pathname)}
                </div>


                <button
                    className="p-2 mt-auto w-6/12 ml-4 my-4 rounded-lg text-blue-800 border-2 border-blue-800  space-x-1 hover:bg-blue-800 hover:text-white hover:border-blue-500 whitespace-nowrap font-medium "
                    onClick={() =>
                        Swal.fire({
                            icon: "warning",
                            iconColor: "purple",
                            title: "Do you want to Log Out?",
                            showCancelButton: true,
                            cancelButtonColor: "green",
                            cancelButtonText: "No",
                            confirmButtonText: "Yes",
                            confirmButtonColor: "red",
                        }).then((result) => {
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