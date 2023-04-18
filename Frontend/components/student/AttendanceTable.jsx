import React from 'react';
import { MdSubject } from "react-icons/md";
import { BiBook } from "react-icons/bi";
import { BsPercent } from "react-icons/bs";
import { FaChalkboardTeacher } from "react-icons/fa";
import Image from "next/image";

const Message = ({ Component, title }) => {
    return (
        <div className='flex items-center'>
            <Component />
            <p className='mx-2'>{title}</p>
        </div>
    )
}

const AttendanceTable = ({ allSubjects, classInfo, attendanceLogs }) => {
    const { classSubjects } = classInfo;
  
    function formatNumber(num) {
        const decimalPlaces = num % 1 !== 0 ? 2 : 0;
        return num.toFixed(decimalPlaces);
    }

    return (
        <table className="w-full text-left">
            <thead className="text-slate-600 bg-indigo-50 font-normal">
                <tr>
                    <th className="p-4">
                        <Message Component={BiBook} title='Subject' />
                    </th>
                    <th>
                        <Message Component={MdSubject} title='Attendance' />
                    </th>
                    <th>
                        <Message Component={BsPercent} title='Percentage' />
                    </th>
                    <th>
                        <Message Component={FaChalkboardTeacher} title='Teacher' />
                    </th>
                </tr>
            </thead>
            <tbody>
                {allSubjects.map((subject, key) => {
                    const subjectTeacher = {
                        image: "/avatar.webp",
                        fname: "",
                        totalLectures: 0,
                        totalAttendance: 0,
                        percentage: 0,
                    };

                    if (classSubjects?.[subject._id]) {
                        const { subjectTeacher: { fname, image } = {}, totalLectures } = classSubjects[subject._id];
                        subjectTeacher.fname = fname ?? "";
                        subjectTeacher.image = image?.url ?? subjectTeacher.image;
                        subjectTeacher.totalLectures = totalLectures;

                        if (attendanceLogs[subject._id]) {
                            const { totalAttendance } = attendanceLogs[subject._id];
                            subjectTeacher.totalAttendance = totalAttendance;
                          
                            subjectTeacher.percentage = totalLectures === 0 ? 0 : formatNumber((totalAttendance / totalLectures) * 100);
                        }
                    }

                    return (
                        <tr className="even:bg-indigo-50 text-slate-600 text-sm font-medium" key={key}>
                            <td className="px-4">{subject.subjectName}</td>
                            <td className="px-10">{`${subjectTeacher.totalAttendance}/${subjectTeacher.totalLectures}`}</td>
                            <td className="px-10">{`${subjectTeacher.percentage}%`}</td>
                            <td className="cursor-pointer flex items-center ">
                                <div className="my-1 px-2 py-1.5 bg-white flex items-center border-2 rounded-md w-[90%]">
                                    <Image
                                        src={subjectTeacher.image}
                                        width="120"
                                        height="120"
                                        className="w-8 h-8 border mx-2 rounded-full"
                                        alt='student image'
                                    />
                                    <span>{subjectTeacher.fname}</span>
                                </div>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default AttendanceTable;
