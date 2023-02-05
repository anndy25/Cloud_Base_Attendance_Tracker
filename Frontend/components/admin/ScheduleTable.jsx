import React from 'react'

const ScheduleTable = () => {
  return (
    <>
      <table className="w-full text-center">
                <thead className=" text-slate-800">
                    <tr>
                        <th className="p-3 w-1/4">Class</th>
                        <th >Department</th>
                        <th className='w-1/4'>Action</th>
                    </tr>
                </thead>
                <tbody className='text-slate-600 font-medium'>

                    <tr className=" odd:bg-blue-50">
                        <td className="p-4">BE 7</td>
                        <td >Electronics And Telecommunication</td>
                        <td className='cursor-pointer'>View</td>
                    </tr>
                   
                    <tr className=" odd:bg-blue-50">
                        <td className="p-4">BE 7</td>
                        <td >Electronics And Telecommunication</td>
                        <td className='cursor-pointer'>View</td>
                    </tr>
                </tbody>
            </table>
    </>
  )
}

export default ScheduleTable 