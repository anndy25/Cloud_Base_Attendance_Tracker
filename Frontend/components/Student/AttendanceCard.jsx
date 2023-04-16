import React, { useEffect, useRef, useState } from 'react';
import { MdOutlineSubject, MdCalendarToday, MdPendingActions } from "react-icons/md";
import { BsClockHistory, BsHddNetworkFill } from "react-icons/bs";
import { RiAlertFill } from "react-icons/ri";
import { ReverseCounter } from '../utility';
import HCaptcha from '@hcaptcha/react-hcaptcha';

import { getCurrentDate, convertTo12HourFormat, hasExpired } from '../../functions/time';

const AttendanceCard = ({ ip, notifications, attendanceLogs }) => {
  const captchaRef = useRef();
  const [token, setToken] = useState(null);
  const todaysDate = getCurrentDate();

  const [attendanceLog, setAttendanceLog] = useState(attendanceLogs);

  function onSubmit(token) {
    alert('thanks ' + document.getElementById('field').value);
  }

  const executeCaptcha = async () => {
    try {
      let res = await captchaRef.current.execute();
      console.log("Verified asynchronously: ", res);
      setToken(res);

    } catch (error) {
      console.log(error);
    }
  };

  const liveAttendance = notifications.filter(course => todaysDate == course.date && !hasExpired(course.expiredAt));

  return (
    <>
      {
        liveAttendance.map((course, key) => {
          return (
            <div className="w-full bg-white shadow-md my-2 flex justify-evenly py-3 text-lg font-semibold text-slate-600  rounded-md" key={key}>
              <div className='flex items-center'><MdOutlineSubject></MdOutlineSubject><span className='ml-2'>{course.subjectId.subjectName}</span></div>
              <div className='flex items-center'><BsClockHistory /> <ReverseCounter targetTime={course.expiredAt} /></div>
              <div className='flex items-center'><RiAlertFill /><span className='ml-2'>{convertTo12HourFormat(course.expiredAt)}</span></div>
              <div className='flex items-center'><BsHddNetworkFill /><span className='ml-2'>{course.ip}</span></div>
              {
                attendanceLog[course.subjectId._id]?.date == todaysDate ?
                  <button className='p-2 bg-indigo-600 text-white w-28 rounded-lg' onClick={executeCaptcha}>check</button> :
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