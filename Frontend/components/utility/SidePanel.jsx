import React from 'react'
import Swal from "sweetalert2";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import { RxDashboard } from "react-icons/rx";
import { BsClockHistory } from "react-icons/bs";




const SidePanel = ({link}) => {
    const router = useRouter();
    return (
        <>
            <div className="h-full flex flex-col ">
                <div className="h-16 flex items-center mt-4 ml-6">
                    <div className="h-full w-12 relative">
                        <Image src="/logo.png" alt="Picture of the author" layout="fill" />
                    </div>
                    <h1 className="ml-3 italic font-bold text-3xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-800 to-blue-900">
                        Alpha
                    </h1>
                </div>
                <div className="text-lg mt-12 font-bold text-gray-700">
                    <div className="py-4 cursor-pointer">
                        <Link href={link.dashboard} className={`pl-6 border-r-4  flex items-center py-2 ${router.pathname == link.dashboard ? "bg-blue-100  border-blue-900" : "bg-white "}`}>
                            <RxDashboard className="mr-3" />
                            Dashboard
                        </Link>
                        <Link href={link.attendance} className={`my-2 pl-6 border-r-4 flex items-center py-2 ${router.pathname == link.attendance ? "bg-blue-100 border-blue-900" : "bg-white"}`}>
                            <BsClockHistory className="mr-3" />
                            Attendance
                        </Link>
                    </div>
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