import React, { useState } from 'react';
import { Navtab, Diagonal } from '../../../components/utility';
import { ScheduleModal } from '../../../components/admin'
import Head from "next/head";
import Link from "next/link";

import { GrPrevious } from "react-icons/gr";
import { RiMenuAddLine } from "react-icons/ri";
import { MdDeleteOutline, MdSystemUpdateAlt } from "react-icons/md";

const ShowSchedule = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [isWarning, setIsWarning] = useState(false);
    const [day, setDay] = useState('Monday');

    function setModal(flag) {
        setIsOpen(flag)

    }

    function setModalWarning(flag) {
        setIsWarning(flag)
    }


    let list = [
        {
            day: 'Monday',
            schedule: [
                {
                    subject: "DBMS",
                    from: '12:00',
                    to: '14:25',
                    subjectTeacher: 'J. J. Johnson'
                },
                {
                    subject: "M2",
                    from: '12:00',
                    to: '14:25',
                    subjectTeacher: 'J. J. Johnson'
                },
                {
                    subject: "M2",
                    from: '12:00',
                    to: '14:25',
                    subjectTeacher: 'J. J. Johnson'
                },
            ]
        },
        {
            day: 'Tuesday',
            schedule: [
                {
                    subject: "DBMS",
                    from: '12:00',
                    to: '14:25',
                    subjectTeacher: 'J. J. Johnson'
                },
                {
                    subject: "M2",
                    from: '12:00',
                    to: '14:25',
                    subjectTeacher: 'J. J. Johnson'
                },
                {
                    subject: "M2",
                    from: '12:00',
                    to: '01:30',
                    subjectTeacher: 'J. J. Johnson'
                },
            ]
        },
        {
            day: 'Wednesday',
            schedule: [
                {
                    subject: "DBMS",
                    from: '12:00',
                    to: '01:30',
                    subjectTeacher: 'J. J. Johnson'
                },
                {
                    subject: "M2",
                    from: '12:00',
                    to: '01:30',
                    subjectTeacher: 'J. J. Johnson'
                },
                {
                    subject: "M2",
                    from: '12:00',
                    to: '14:25',
                    subjectTeacher: 'J. J. Johnson'
                },
            ]
        },
        {
            day: 'Thursday',
            schedule: [{
                subject: "DBMS",
                from: '12:00',
                to: '01:30',
                subjectTeacher: 'J. J. Johnson'
            },
            {
                subject: "M2",
                from: '12:00',
                to: '13:30 PM',
                subjectTeacher: 'J. J. Johnson'
            },]
        },
        {
            day: 'Friday',
            schedule: []
        },
        {
            day: 'Saturday',
            schedule: []
        },

    ]

    function onClickHandler(e) {
      
        if (e.target.className.baseVal == 'add') {
            setDay(e.target.id);
            setIsOpen(true);
        } else if (e.target.className.baseVal == 'delete') {
            setIsWarning(true);    
        }
    }
    return (
        <>
            <Head>
                <title>Alpha | Schedule</title>
            </Head>
            <div className='shadow-md'>
                <Navtab />
            </div>
            <Link href='/admin/schedule' className='p-2 rounded-lg m-4 font-semibold justify-center items-center bg-slate-200 flex cursor-pointer w-28'><GrPrevious /> <span className='mx-1'>Go Back</span></Link>
            <div className='w-11/12 mx-auto p-4 text-gray-600'>
                <div className='grid grid-cols-3 gap-4' onClick={onClickHandler}>
                    {
                        list.map((value, key) => {

                            return (
                                <div key={key} className='border-2 rounded-md px-3' >
                                    <header className='flex justify-between py-3 text-xl items-center'><span>{value.day}</span>
                                        <div className='text-xl cursor-pointer' >
                                            <RiMenuAddLine className='add' id={`${value.day}`}></RiMenuAddLine>
                                        </div>
                                    </header>
                                    <section className='py-2'>
                                        {value.schedule.map((value, key) => {

                                            return (
                                                <div key={key} className={`group relative p-2 text-white font-semibold bg-gradient-to-r from-cyan-500 to-blue-500 cursor-pointer  border-2 border-white rounded-md`}>
                                                    <p>{value.from}-{value.to} : {value.subject}</p>
                                                    <p>{value.subjectTeacher}</p>
                                                    <div className='absolute top-0 right-0 text-white  hidden  h-full w-full text-3xl group-hover:flex group-hover:justify-end group-hover:items-center' style={{ backgroundColor: 'rgba(0,0,0,0.1)' }}>
                                                        <MdSystemUpdateAlt className='hover:text-teal-500' />
                                                        <div className='hover:text-red-500 mx-2'>
                                                            <MdDeleteOutline className='delete' />
                                                        </div>
                                                    </div>
                                                </div>

                                            )
                                        })}
                                    </section>
                                </div>
                            )
                        })

                    }
                </div>

            </div>
            {isOpen && <ScheduleModal isOpen={isOpen} setModal={setModal} day={day} />}
            {isWarning && <Diagonal isOpen={isWarning} setModal={setModalWarning} />}
        </>
    )
}

export default ShowSchedule