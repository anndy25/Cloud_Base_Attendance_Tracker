import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { AiOutlineCaretDown } from 'react-icons/ai'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function DropDownMenu() {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-blue-700 px-4 py-2 text-sm font-medium text-white shadow-sm focus:outline-none   focus:ring-offset-2 focus:ring-offset-gray-100">
          Find By: All
          <AiOutlineCaretDown className="-mr-1 ml-2  w-5" aria-hidden="true" />
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
        <Menu.Items className="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? 'bg-blue-100 text-blue-600' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                All
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? 'bg-blue-100 text-blue-600' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                Name
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? 'bg-blue-100 text-blue-600' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Reg. No.
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? 'bg-blue-100 text-blue-600' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Email Id
                </a>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
