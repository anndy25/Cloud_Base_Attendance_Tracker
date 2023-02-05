import React, { Fragment, useState } from 'react'
import { Transition } from '@headlessui/react'
import { ListSelect, AutoComplete } from '../utility';
import { RxCross1 } from "react-icons/rx";

const ScheduleModal = ({ isOpen, setModal, day }) => {
    const class_ = [
        { name: 'BE 6' },
        { name: 'BE 7' },
        { name: 'BE 8' },
        { name: 'BE 9' },
    ]
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
                        <div className='w-2/5 p-6 shadow-md rounded-md bg-white'>
                            <RxCross1 className='float-right text-2xl cursor-pointer' onClick={() => setModal(false)} />
                            <span className="px-4 py-2 rounded-md text-blue-800 bg-blue-200">BE 7</span>
                            <span className="mx-4 px-4 py-2 rounded-md text-amber-800 bg-amber-200">{day}</span>

                            <div className="w-full my-6">
                                <span className="font-medium">Subject</span>
                                <ListSelect data={class_} />
                            </div>
                            <div className="w-full mb-6">
                                <span className="font-medium">Subject Teacher</span>
                                <AutoComplete data={class_} />
                            </div>
                            <div className="w-full flex">
                                <div className="w-full mb-6 ">
                                    <label htmlFor="regId" className="font-medium">From</label>
                                    <input type="time" name="regId" id="regId" className="p-2 border-b-2 block  focus:outline-none w-full" required />
                                </div>
                                <div className="w-full ml-4  ">
                                    <label htmlFor="regId" className="font-medium">To</label>
                                    <input type="time" name="regId" id="regId" className="p-2 border-b-2 block  focus:outline-none w-full" required />
                                </div>
                            </div>
                            <button className='mb-3 py-2.5 rounded-md w-full bg-blue-600 text-white'>Submit</button>
                        </div>

                    </Transition.Child>
                </div>
            </Transition>
        </>
    )
}

export default ScheduleModal