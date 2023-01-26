import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Head from "next/head";
import { SidePanel, Navtab } from '../../../components/utility';


const tsubject = () => {
    let link = { dashboard: "/teacher/dashboard", attendance: "/teacher/attendance", flag: false }
    const router = useRouter();
    const [query, setQuery] = useState(router.query.tsubject);
    console.log(query);
    
    return (
        <>
            <Head>
                <title>Alpha | {router.query.tsubject}</title>
            </Head>
            <div className="min-h-screen flex">
                <div className="top-0 left-0 sticky h-screen w-[18%]  overflow-x-auto shadow-xl">
                    <SidePanel link={link} />
                </div>
                <div className="w-[82%] ">
                    <div className='border-b-2'>
                        <Navtab />
                    </div>
                    <div className='p-6 bg-neutral-50 min-h-[90%]'>
                        <h1 className="font-bold text-xl text-gray-600"></h1>
                        <div className=' py-4'>
                        
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default tsubject
