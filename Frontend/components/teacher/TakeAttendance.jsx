import React from 'react'
import { useState, useEffect } from 'react'
import { addTime } from '../../functions/addTime';




const TakeAttendance = () => {

    const [ip, setIP] = useState('103.146.240.70');
    const [duration, setDuration] = useState(0);

    const onSubmitHandler = (e) => {

        let result = addTime(new Date().getHours(), new Date().getMinutes(), parseInt(duration))

        setMessage(`Attendance will expired at ${result}`);

        setIsOpen(true);
    }



    return (
        <div className='min-h-[24rem] p-6'>
            <div>
                <span className='font-semibold  text-blue-800 bg-blue-100 px-4 py-2 rounded-3xl'>IP : {ip}</span>
            </div>
            <h1 className="text-lg my-6 px-4 font-semibold text-gray-600">Genrate Link for Attendance!!</h1>
            <div className='flex flex-col text-base w-full px-4' >
                <div className="w-2/5">
                    <label className="block text-gray-600  font-bold mb-2" Htmlfor="username">
                        Set Duration (min)
                    </label>
                    <input className="selection: text-gray-400 border shadow-sm focus:outline-none rounded w-full py-2 px-3" id="username" type="Number" value={duration} onChange={(e) => setDuration(e.target.value)} />
                </div>
                <button className='bg-indigo-600 p-3 text-white rounded text-sm my-4 w-2/5' onClick={onSubmitHandler}>Create Link</button>
            </div>

        </div>
    )
}



export default TakeAttendance