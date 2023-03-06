import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import Image from "next/image";
import { BsCheck2 } from 'react-icons/bs'
import { RiArrowUpDownLine } from 'react-icons/ri'


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ListSelect({ teachers }) {
  const [selected, setSelected] = useState({
    fname: "Select Teacher",
    image: { url: "/avatar.webp" }
  })

  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <div className="relative">
            <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
              <span className="flex items-center">
                <Image src={selected.image.url} alt="" width="120" height="120" className="h-8 w-8 flex-shrink-0 rounded-full" />
                <span className="ml-3 block truncate">{selected.fname}</span>
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <RiArrowUpDownLine className=" text-gray-400 text-xl"  />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {teachers.map((teacher) => (
                  <Listbox.Option
                    key={teacher._id}
                    className={({ active }) =>
                      classNames(
                        active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-3 pr-9'
                      )
                    }
                    value={teacher}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          <Image src={teacher.image.url} width="120" height="120" alt="" className="h-5 w-5 flex-shrink-0 rounded-full" />
                          <span
                            className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                          >
                            {teacher.fname}
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-indigo-600',
                              'absolute inset-y-0 right-0 flex items-center pr-4'
                            )}
                          >
                            <BsCheck2 className="h-5 w-5"  />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}
