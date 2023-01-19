import React from 'react'

const AttendanceTable = () => {
    return (
        <div> <table className="mx-auto table-auto w-[90%]">
            <thead className="bg-gray-800 text-white text-lg border border-gray-400">
                <tr>
                    <th className="text-left px-5 py-3">Subject</th>
                    <th className="text-left p-3">Attendance</th>
                    <th className="text-left p-3">Percentage</th>
                    <th className="text-left p-3">Teacher</th>
                </tr>
            </thead>
            <tbody>

                <tr
                  
                    className="ease-out duration-200 py-3 odd:bg-white even:bg-slate-100 text-base hover:bg-slate-400"
                >
                    {/* <td className="text-left px-5 py-3">DBMS</td>
                    <td className="text-left p-3">{value.guestI</td>

                    <td className="text-left p-3 text-blue-600 cursor-pointer">
                        <Link to="/admin/guest-application/1234">view</Link>
                    </td> */}
                </tr>


            </tbody>
        </table></div>
    )
}

export default AttendanceTable