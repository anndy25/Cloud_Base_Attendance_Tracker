import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { BsThreeDotsVertical } from "react-icons/bs";
import Link from "next/link";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function DropDownCreate() {
    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="inline-flex w-full justify-center text-slate-500 text-2xl  hover:text-indigo-600 p-2">
                    <BsThreeDotsVertical />
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div>
                        <Menu.Item>
                            {({ active }) => (
                                <Link
                                    href="/admin/student/student-registration"
                                    className={classNames(
                                        active ? 'bg-indigo-100 text-indigo-600' : 'text-gray-700',
                                        'block px-4 py-2 text-sm'
                                    )}
                                >
                                    Create Student Account
                                </Link>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <Link
                                    href="/admin/teacher/teacher-registration"
                                    className={classNames(
                                        active ? 'bg-indigo-100 text-indigo-600' : 'text-gray-700',
                                        'block px-4 py-2 text-sm'
                                    )}
                                >
                                    Create Teacher Account
                                </Link>
                            )}
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}