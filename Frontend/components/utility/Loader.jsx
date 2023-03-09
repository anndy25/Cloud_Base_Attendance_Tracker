import React from 'react'


const Loader = () => {
    return (
        <div className='h-screen w-screen flex justify-center items-center'>
            <div className="w-64 h-64 m-auto flex flex-col items-center justify-center bg-white rounded-lg">
                <div className="flex mb-4">
                    <div className="dot mr-3 w-20 h-20"></div>
                    <div className="dot mr-3 w-40 h-40"></div>
                    <div className="dot mr-3 w-20 h-20"></div>
                    <div className="dot w-20 h-20"></div>
                </div>
                <h2 className="text-center text-indigo-600 text-3xl font-semibold mt-4">Loading...</h2>
                <p className="text-center text-gray-600 mt-2">This may take a few seconds, please don't close this page.</p>
            </div>
        
        </div>



    )
}

export default Loader