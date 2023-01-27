import React from 'react'
import { useState, useEffect } from 'react'



const TakeAttendance = () => {
    const [ip, setIP] = useState('123.134.12.300');

    //creating function to load ip address from the API




    return (
        <div className='min-h-[24rem] p-6'>
            <div>
                <span className='font-semibold  text-blue-800 bg-blue-100 px-4 py-2 rounded-3xl'>IP : {ip}</span>
            </div>
            <h1 className="text-lg my-6 px-4 font-semibold text-gray-600">Genrate Link for Attendance!!</h1>
            <form className='flex flex-col text-base w-full px-4'>
                <div className="w-2/5">
                    <label className="block text-gray-600  font-bold mb-2" for="username">
                        Set Duration (min)
                    </label>
                    <input className="selection: text-gray-400 border shadow-sm focus:outline-none rounded w-full py-2 px-3" id="username" type="Number" />
                </div>
                <button className='bg-indigo-600 p-3 text-white rounded text-sm my-4 w-2/5'>Create Link</button>
            </form>
        </div>
    )
}



export default TakeAttendance