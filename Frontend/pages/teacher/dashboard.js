import React from 'react';
import Head from "next/head";
import { SidePanel } from '../../components/utility';
// import {} from '../../components/student'

const dashboard = () => {
    let link={ dashboard: "/teacher/dashboard", attendance: "/teacher/attendance" }
    return (
        <>
            <Head>
                <title>Alpha | Teacher Dashboard</title>
            </Head>
            <div className='className="min-h-screen flex"'>
                <div className="top-0 left-0 sticky h-screen w-[18%]  overflow-x-auto shadow-xl">
                <SidePanel link={link} />
                </div>
            </div>

    
        </>
    )
}

export default dashboard