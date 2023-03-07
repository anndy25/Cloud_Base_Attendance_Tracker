import React, { Fragment, useState } from 'react'
import { Transition } from '@headlessui/react'
import Swal from 'sweetalert2'
import { ListSelect, AutoComplete } from '../utility';
import { RxCross1 } from "react-icons/rx";
import axios from 'axios';

const ScheduleModal = ({ isOpen, setModal, day, subjects, classSubjectList, classId, setState }) => {

    const [schedule, setSchedule] = useState({ from: '', to: '', subjectId: '' });
    const [courseTeacher, setCourseTeacher] = useState('');
    const [subject,setSubject]=useState('Select Subject')



    const onSetHandler = (e) => {

        let { name, value } = e.target;

        if (name === 'subjectId') {
            if (value === 'Select Subject') return;
            const id = e.target.options[e.target.selectedIndex].id;
            setCourseTeacher(classSubjectList[id].subjectTeacher.fname)
            setSubject(value);
            value = id
        }

        setSchedule((prevState) => ({
            ...prevState,
            [name]: value,
        }));

    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/schedule/setClassSchedule?classId=${classId}&day=${day}`,
                { subjectTeacherId: classSubjectList[schedule.subjectId].subjectTeacher._id, ...schedule },
                { withCredentials: true });

            setState(data);
            setSchedule({ from: '', to: '', subjectId: '' });
            setCourseTeacher("");
            setSubject('Select Subject')


            Swal.fire({
                position: 'top-center',
                icon: 'success',
                title: 'Sucessfully added lecture in schedule!',
                showConfirmButton: false,
                timer: 1500
            })
        } catch (e) {
            Swal.fire({
                position: 'top-center',
                icon: 'error',
                title: 'Server error!',
                showConfirmButton: false,
                timer: 1500
            })
        }
    }

    return (
        <>
            <Transition
                appear show={isOpen}
            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className='fixed top-0 right-0 h-full w-full flex justify-center items-center'>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >

                        <form className='w-2/5 p-6 shadow-md rounded-md bg-white' onSubmit={onSubmitHandler}>
                            <RxCross1 className='float-right text-2xl cursor-pointer' onClick={() => setModal(false)} />
                            <span className="px-4 py-2 rounded-md text-blue-800 bg-blue-200">BE 7</span>
                            <span className="mx-4 px-4 py-2 rounded-md text-amber-800 bg-amber-200">{day}</span>

                            <div className="w-full my-6">
                                <span className="font-medium">Course</span>
                                <select name='subjectId' className="p-2 border-b-2 block  focus:outline-none w-full" onChange={onSetHandler} value={subject}
                                >
                                    <option>Select Subject</option>
                                    {
                                        subjects.map((subject, key) => {
                                            return (
                                                <option key={key} id={subject._id} disabled={(classSubjectList[subject._id] && classSubjectList[subject._id].subjectTeacher) ? false : true} >{subject.subjectName}</option>
                                            )

                                        })
                                    }
                                </select>
                            </div>
                            <div className="w-full">
                                <div className=" w-full">
                                    {courseTeacher &&
                                        <>
                                            <label htmlFor="ct" className="font-medium">Course Teacher</label>
                                            <input type="text" name="ct" id="ct" className=" p-1.5 border-b-2 block  focus:outline-none w-full" value={courseTeacher} />
                                        </>
                                    }
                                </div>
                            </div>
                            <div className="w-full flex my-6">
                                <div className="w-full  ">
                                    <label htmlFor="from" className="font-medium">From</label>
                                    <input type="time" name="from" id="from" className="p-2 border-b-2 block  focus:outline-none w-full" onChange={onSetHandler} value={schedule.from} required />
                                </div>
                                <div className="w-full ml-4  ">
                                    <label htmlFor="to" className="font-medium">To</label>
                                    <input type="time" name="to" id="to" className="p-2 border-b-2 block  focus:outline-none w-full" onChange={onSetHandler} value={schedule.to} required />
                                </div>
                            </div>
                            <button className='mb-3 py-2.5 rounded-md w-full bg-indigo-600 text-white'>Submit</button>
                        </form>
                    </Transition.Child>
                </div>
            </Transition>
        </>
    )
}

export default ScheduleModal