import React from 'react';
import Image from "next/image";
import { useRouter } from 'next/router';

const TeacherList = ({ teachers }) => {
  const router = useRouter();
  return (
    <>
      <table className="w-full text-left ">
        <thead className="text-slate-700">
          <tr className='bg-indigo-50'>
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
              <tr className=" even:bg-indigo-50 cursor-pointer hover:text-indigo-600" key={key} onClick={() => router.push(`/admin/teacher/${teacher._id}`)}>
                <td className="p-1 cursor-pointer flex items-center">
                  <Image
                    src={teacher.image.url}
                    width="120"
                    height="120"
                    className="w-12 h-12 border mx-2 rounded-full"
                    alt="teacher image"
                  />
                  <p>{teacher.fname}</p>
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
