import React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios';
import { addTime } from '../../functions/time';
import Swal from "sweetalert2";
import { MdOutlineSubject, MdCalendarToday, MdNetworkWifi } from "react-icons/md";
import { BsClockHistory } from "react-icons/bs";

import { getFormattedDate, getCurrentDate } from '../../functions/time';

const ShowAttendanceCard = ({ props }) => {
    const { attendanceDetails, setFlagHandler, subjectName } = props;
    return (
        <>
            <div className="w-full  bg-blue-50 text-slate-600  shadow-lg flex justify-between p-4 font-semibold     rounded-b-md">

                <div className='flex items-center'><MdOutlineSubject></MdOutlineSubject>
                    <span className='ml-2'>{subjectName}</span>
                </div>

                <div className='flex items-center'>
                    <MdNetworkWifi /> <span className='ml-2'>{attendanceDetails.ip}</span>
                </div>
                <div className='flex items-center'>
                    <MdCalendarToday /><span className='ml-2'>{getFormattedDate()}</span>
                </div>
                <div className='flex items-center'>
                    <BsClockHistory />
                    <span className='ml-2'>{attendanceDetails.expiredAt}</span>
                </div>
                <div className='flex items-center'>
                    <button className='bg-indigo-600 text-white px-3 py-2 rounded-md' onClick={() => setFlagHandler(true)}>Update</button>
                </div>
            </div>
        </>
    )
}

const SetAttendanceCard = ({ props }) => {
    const router = useRouter();
    const [time, setTime] = useState({ min: 0, sec: 0 })
    const { subjectId, teacherId, classId } = router.query;
    const { setStateHandler, ip, setFlagHandler, attendanceDetails,todayDate } = props;

    const onClickHandler = (e) => {

        const { result12hr, result24hr } = addTime(
            new Date().getHours(),
            new Date().getMinutes(),
            new Date().getSeconds(),
            parseInt(time.min),
            parseInt(time.sec)
        );

        Swal.fire({
            title: `<small>Attendance will expired at ${result12hr}</small>`,
            showCancelButton: true,
            cancelButtonText: "No, cancel!",
            confirmButtonText: "Yes, confirm it!",
            confirmButtonColor: "#4f46e5",
        }).then(async (result) => {
            if (result.isConfirmed) {
                
                try {
                    const response = await axios.put(
                        `${process.env.NEXT_PUBLIC_API_URL}/api/attendance/setAttendance`,
                        {
                            ip,
                            expiredAt: result24hr,
                            date:todayDate,
                            classId,
                            teacherId,
                            subjectId,
                        }
                    );

                    if (response.status === 201) {

                        setStateHandler({ ip, expiredAt: result24hr, date:todayDate });
                        setFlagHandler(false);
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Attendance Set!",
                            showConfirmButton: false,
                            timer: 2000,
                        });
                    }


                } catch (err) {

                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: "Server error!",
                        showConfirmButton: false,
                        timer: 2000,
                    });
                }
            }
        });
    };


    const onChangeHandler = (e) => {
        const { value, name } = e.target;
        setTime((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    return (
        <>
            <div className='p-6'>
                {
                    attendanceDetails.date ==todayDate && <button className='bg-indigo-600 text-white px-3 py-2 rounded-md float-right' onClick={() => setFlagHandler(false)} >Cancle</button>
                }
                <div>
                    <span className='font-semibold  text-blue-800 bg-blue-100 px-4 py-2 rounded-3xl'>IP : {ip}</span>
                </div>
                <h1 className="text-lg my-6 px-4 font-semibold text-gray-600">Genrate Link for Attendance!!</h1>
                <div className='flex flex-col text-base w-full px-4' >
                    <div className="w-1/2">
                        <label className="block text-gray-600  font-bold mb-2" htmlFor="username">
                            Set Duration
                        </label>
                        <div className="flex my-4">
                            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md">
                                Minute
                            </span>
                            <input type="number" name='min' id="website-admin" className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5" placeholder="min" value={time.min} onChange={onChangeHandler} />

                            <span className="ml-6 inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md">
                                Second
                            </span>
                            <input type="number" name='sec' id="website-admin" className=" rounded-none rounded-r-lg bg-gray-50 border text-gray-900 flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5" placeholder="sec" value={time.sec} onChange={onChangeHandler} />
                        </div>
                    </div>
                    <button className='bg-indigo-600 p-3 text-white rounded text-sm my-4 w-1/2' onClick={onClickHandler}>Create Link</button>
                </div>
            </div>
        </>
    )
}

const TakeAttendance = ({ noty }) => {


    const { notification, ip, subjectName } = noty;

    const [todayDate, setTodayDate] = useState(getCurrentDate());
    const isMatch = notification.date == todayDate ? false : true
    const [attendanceDetails, setAttendanceDetails] = useState(notification);
    const [flag, setFlag] = useState(isMatch);

    function setStateHandler(value) {
        setAttendanceDetails(value);
        setFlag(true);
    }

    function setFlagHandler(flag) {
        setFlag(flag)
    }

    return (
        <>

            {
                flag ?
                    <SetAttendanceCard props={{ setStateHandler, ip, setFlagHandler, attendanceDetails ,todayDate}} /> :
                    <ShowAttendanceCard props={{ setFlagHandler, attendanceDetails, subjectName }} />
            }
        </>
    )
}




export default TakeAttendance