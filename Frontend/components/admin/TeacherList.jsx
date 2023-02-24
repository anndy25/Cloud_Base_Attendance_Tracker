import React from 'react'

const TeacherList = ({ teachers }) => {
  return (
    <>
      <table className="w-full text-left">
        <thead className=" text-slate-700">
          <tr>
            <th className="p-3 w-[26%]">Name</th>
            <th className='w-[15%]'>Reg. Id</th>
            <th className='w-[16%]'>Department</th>
            <th className='w-[15%]'>Phone No.</th>
            <th >Email Id</th>
          </tr>
        </thead>
        <tbody className='text-slate-600 font-medium'>

          {
            teachers.map((teacher, key) => {
              return (
                <tr className=" odd:bg-blue-50" key={key}>
                  <td className="p-1 cursor-pointer flex  items-center ">
                    <div className="w-12 h-12 rounded-full border-2  mr-2"></div>
                    <span>{teacher.fname}</span>
                  </td>
                  <td>{teacher.regNo}</td>
                  <td >{teacher.departmentId.departmentName}</td>
                  <td >{teacher.phoneNumber}</td>
                  <td >{teacher.email}</td>
                </tr>

              )
            })
          }

        </tbody>
      </table>
    </>
  )
}

export default TeacherList