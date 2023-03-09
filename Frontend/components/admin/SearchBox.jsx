import React from 'react'


const SearchBox = ({ searchContent, placeholder }) => {
    let list = ['All', 'Name', 'Reg. No.', 'Email Id'];

    const handleInputChange = (event) => {
        searchContent(event.target.value);
    };

    return (
        <div className='my-4  w-1/2 mx-auto'>


            <div className="flex rounded-md shadow-sm">
                <button type="button" className="inline-flex flex-shrink-0 justify-center items-center h-[2.875rem] w-16 rounded-l-md border border-transparent font-semibold bg-indigo-500 text-white hover:bg-indigo-600 focus:z-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm" >
                    <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                    </svg>
                </button>
                <input type="text" id="hs-trailing-button-add-on-with-icon" name="hs-trailing-button-add-on-with-icon" className="py-3 px-4 block w-full border border-gray-200 shadow-sm  text-sm outline-none focus:border-indigo-500 focus:ring-indigo-500  " placeholder={placeholder} onChange={handleInputChange} />
            </div>

        </div>
    )
}

export default SearchBox