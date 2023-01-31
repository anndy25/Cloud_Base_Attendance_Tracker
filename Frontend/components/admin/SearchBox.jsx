import React from 'react'
import { DropDownMenu } from '../utility'

const SearchBox = () => {
    return (
        <div className='my-4 ml-1'>
            <DropDownMenu />
            <input className="ml-3 selection: text-gray-700 border-2 shadow-sm focus:outline-none rounded w-1/3 py-1 px-3" type="text" />
        </div>
    )
}

export default SearchBox