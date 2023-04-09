import React, { useState } from 'react'
import Image from "next/image";
import { MdDeleteOutline, MdOutlinePersonAddAlt } from "react-icons/md";
import ListSelect from './ListSelect';
import { toast } from 'react-toastify';
import axios from "axios"
import Swal from 'sweetalert2'


const options = {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
}

const ClassSubjectList = ({ classSubjectList, allSubjects, allTeachers, classId, setState }) => {

    const [courseTeacher, setCourseTeacher] = useState({});

    const setTeacherHandler = (teacher, key) => {
        if (teacher._id) {
            setCourseTeacher({
                ...courseTeacher,
                [`${key}`]: { id: teacher._id, fname: teacher.fname }
            })
        }

    }

    const onAddHandler = async (subjectId, attendanceId = -1, key) => {
        if (!courseTeacher[key]) {
            toast.warn("Please select teacher!", options);
        }
        else {

            Swal.fire({
                title: `<small>Do you want to add course teacher?</small>`,
                showCancelButton: true,
                confirmButtonText: 'Yes, add it!',

            }).then(async (result) => {

                if (result.isConfirmed) {
                    try {
                        const { data } = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/schedule/assignLecture/${classId}`,
                            { subjectTeacherId: courseTeacher[key].id, subjectId, attendanceId }, { withCredentials: true });


                        setState(data);
                        Swal.fire({
                            position: 'top-center',
                            icon: 'success',
                            title: 'Coursed teacher added sucessfully!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                    catch (err) {
                        Swal.fire({
                            position: 'top-center',
                            icon: 'error',
                            title: 'Server error!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                }
            })


        }

    }


    const removeTeacher = async (subjectId, subjectTeacherId) => {

        try {
            Swal.fire({
                title: `<small>Do you want to remove course teacher?</small>`,
                showCancelButton: true,
                confirmButtonText: 'Yes, remove it!',

            }).then(async (result) => {

                if (result.isConfirmed) {

                    const { data } = await axios.delete(
                        `${process.env.NEXT_PUBLIC_API_URL}/api/schedule/removeTeacher/${classId}`,
                        {
                            withCredentials: true,
                            data: { subjectId, subjectTeacherId }
                        }
                    );

                    console.log(data);
                    setState(data);
                    Swal.fire({
                        position: 'top-center',
                        icon: 'success',
                        title: 'Coursed teacher removed sucessfully!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })

        } catch (error) {
            Swal.fire({
                position: 'top-center',
                icon: 'error',
                title: 'Server error!',
                showConfirmButton: false,
                timer: 1500
            })
        }

    }

    return (
        <>
            <table className="w-full text-left">
                <thead className=" text-slate-800">
                    <tr>
                        <th className="px-4 py-6 w-1/4">Course Name</th>
                        <th className='w-[15%]'>Course Code</th>
                        <th className='w-[15%]'>Semester</th>
                        <th className='w-1/3'>Course Teacher</th>
                        <th >Action</th>
                    </tr>
                </thead>
                <tbody className='text-slate-600 font-medium'>
                    {
                        allSubjects.map((subject, key) => {
                            let attendanceId
                            if (classSubjectList && classSubjectList[subject._id]) attendanceId = classSubjectList[subject._id].attendanceId;
                            return (
                                <tr className=" odd:bg-blue-50" key={key}>
                                    <td className="p-3">{subject.subjectName}</td>
                                    <td>{subject.courseCode}</td>
                                    <td>{subject.semester}</td>
                                    <td className='text-slate-800'>
                                        {
                                            (classSubjectList && classSubjectList[subject._id] && classSubjectList[subject._id].subjectTeacher) ?
                                                <div className='w-3/4 py-1.5 my-1 bg-white flex items-center border-2 rounded-md'>
                                                    <Image
                                                        src={classSubjectList[subject._id].subjectTeacher.image.url}
                                                        width="120" height="120"
                                                        className="w-8 h-8 border mx-2 rounded-full " alt='student image' />
                                                    <span className='text-sm'>{classSubjectList[subject._id].subjectTeacher.fname}</span>
                                                </div> :

                                                <div className='w-3/4 my-1'>
                                                    <ListSelect teachers={allTeachers} key_={key} setTeacherHandler={setTeacherHandler} />
                                                </div>

                                        }
                                    </td>

                                    {
                                        (classSubjectList && classSubjectList[subject._id] && classSubjectList[subject._id].subjectTeacher) ?
                                            <>
                                                <td onClick={() => removeTeacher(subject._id, classSubjectList[subject._id].subjectTeacher._id)}><MdDeleteOutline className='text-3xl cursor-pointer hover:text-red-600' /></td>
                                            </> :
                                            <>
                                                <td onClick={() => onAddHandler(subject._id, attendanceId, key)}><MdOutlinePersonAddAlt className='text-3xl cursor-pointer hover:text-green-600' /></td>
                                            </>
                                    }
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </>
    )
}

export default ClassSubjectList