import React from 'react'
import { DropDownMenu } from '../utility'

const SearchBox = ({searchContent,placeholder}) => {
    let list = ['All', 'Name', 'Reg. No.', 'Email Id'];

        const handleInputChange = (event) => {
            searchContent(event.target.value);
        };

    return (
        <div className='my-4 ml-1'>
            <DropDownMenu list={list} />
            <input className="ml-3 selection: text-gray-700 border-2 shadow-sm focus:outline-none rounded w-1/3 py-1 px-3"  type="text" placeholder={placeholder} onChange={handleInputChange} />
        </div>
    )
}

export default SearchBox