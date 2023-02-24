import React from 'react';
import Image from "next/image";
import Link from "next/link";

const TeacherList = ({ teachers }) => {
  return (
    <>
      <table className="w-full text-left">
        <thead className="text-slate-700">
          <tr>
            <th className="p-3 w-[25%]">Name</th>
            <th className="w-[13%]">Reg. Id</th>
            <th className="w-[25%]">Department</th>
            <th className="w-[13%]">Phone No.</th>
            <th>Email Id</th>
          </tr>
        </thead>
        <tbody className="text-slate-600 font-medium">
          {teachers.map((teacher, key) => {
            return (
              <tr className="odd:bg-indigo-50" key={key} >
                <td className="p-1 cursor-pointer flex items-center">
                  <Image
                    src={teacher.image.url}
                    width="120"
                    height="120"
                    className="w-12 h-12 border mx-2 rounded-full"
                  />
                  <Link className='hover:text-slate-800' href={`/admin/teacher/${teacher._id}`}>{teacher.fname}</Link>
                </td>
                <td>{teacher.regNo}</td>
                <td ><p className='w-[95%] truncate'>{teacher.departmentId.departmentName}</p></td>
                <td>{teacher.phoneNumber}</td>
                <td>{teacher.email}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default TeacherList;
