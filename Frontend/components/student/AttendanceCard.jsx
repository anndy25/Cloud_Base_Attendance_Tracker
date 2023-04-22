import React, { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from "axios"
import Swal from "sweetalert2";
import { MdOutlineSubject, MdPendingActions } from "react-icons/md";
import { BsClockHistory, BsHddNetworkFill } from "react-icons/bs";
import { RiAlertFill } from "react-icons/ri";
import { ReverseCounter } from '../utility';

import HCaptcha from '@hcaptcha/react-hcaptcha';

import { getCurrentDate, convertTo12HourFormat, hasExpired, getCurrentTime } from '../../functions/time';

const AttendanceCard = ({ ip, notifications, attendanceLogs, classId }) => {

  const captchaRef = useRef();
  const router = useRouter();
  const { studentId } = router.query;

  const [token, setToken] = useState(null);
  const todaysDate = getCurrentDate();
  const [studentInfo, setStudentInfo] = useState(null);
  const [attendanceLog, setAttendanceLog] = useState(attendanceLogs);

  const liveAttendance = notifications.filter(course => (todaysDate === course.date) && (!hasExpired(course.expiredAt)) ? true : false);

  async function attendanceMarking() {
    try {
      const { data } = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/attendance/markAttendance`, {
        studentId,
        currentTime: getCurrentTime(),
        date: todaysDate,
        attendanceId: studentInfo.attendanceId,
        ip,
        token,
      }, { params: { classId, subjectId: studentInfo.subjectId } })

      Swal.fire({
        position: "center",
        icon: "success",
        title: `<small>Attendance Marked!</small>`,
        showConfirmButton: false,
        timer: 1500,
      });
      setAttendanceLog(data);
      setToken(null);
      router.reload();

    } catch (error) {
      Swal.fire(
        {
          position: "center",
          icon: "error",
          title: `<small> ${error.data.message}!</small>`,
          showConfirmButton: false,
          timer: 1500,
        });
    }
  }

  useEffect(() => {

    if (token) {
      attendanceMarking()
    }
  }, [token])



  const executeCaptcha = async (attendanceInfo) => {
    if (ip !== attendanceInfo.ip) {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: `<small>Please connect with class Wifi IP: ${attendanceInfo.ip}!</small>`,
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
    try {

      let res = await captchaRef.current.execute();
      setStudentInfo(attendanceInfo);
      setToken(res);

    } catch (error) {
      console.log(error);
    }
  };


  return (
    <>
      {
        liveAttendance.map((course, key) => {
          return (
            <div key={key}>
              <div className="w-full bg-white shadow-md my-2 flex justify-evenly py-3 border font-semibold text-slate-600  rounded-md" >
                <div className='flex items-center'><MdOutlineSubject></MdOutlineSubject><span className='ml-2'>{course.subjectId.subjectName}</span></div>
                <div className='flex items-center'><BsClockHistory /> <ReverseCounter targetTime={course.expiredAt} /></div>
                <div className='flex items-center'><RiAlertFill /><span className='ml-2'>{convertTo12HourFormat(course.expiredAt)}</span></div>
                <div className='flex items-center'><BsHddNetworkFill /><span className='ml-2'>{course.ip}</span></div>
                {
                  attendanceLog[course.subjectId._id]?.date !== todaysDate ?
                    <button className='p-2 bg-indigo-600 text-white w-28 rounded-lg' onClick={() => executeCaptcha(
                      {
                        ip: course.ip,
                        subjectId: course.subjectId._id,
                        attendanceId: course.attendanceId
                      })}>check</button> :
                    <div className='flex items-center py-2 px-6 rounded-3xl  bg-teal-100 text-teal-600'>
                      <MdPendingActions /><span className='ml-2'>Marked</span>
                    </div>
                }
                <HCaptcha
                  ref={captchaRef}
                  sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_KEY}
                  onVerify={(token) => setToken(token)}
                  onExpire={(e) => setToken("")}
                  size='invisible'
                />
              </div>
              { (ip !== course.ip && ip!=='1.1.1.1') &&
                <p className='px-4 py-2 mx-auto w-10/12 text-center bg-orange-100 text-orange-600 font-medium rounded-md'>{`Warning: Connect to class Wifi whose IP is ${course.ip} to marke attendance of ${course.subjectId.subjectName}`}</p>
              }
            </div>
          )
        })
      }
      {
        liveAttendance.length == 0 &&
        <p className="w-full bg-white shadow-md my-2 flex justify-evenly py-4  font-semibold text-slate-600  rounded-md border">No Any Live Attendance...</p>
      }

    </>)
}

export default AttendanceCard;