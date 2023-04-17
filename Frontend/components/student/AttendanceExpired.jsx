import React from 'react'
import { MdOutlineSubject, MdCalendarToday, MdPendingActions } from "react-icons/md";
import { RiAlertFill } from "react-icons/ri";
import { getFormattedDate, convertTo12HourFormat, hasExpired, getCurrentDate } from '../../functions/time';

const AttendanceExpired = ({ notifications, attendanceLogs }) => {
    const todaysDate = getCurrentDate();
    const expiredAttendance = notifications.filter(({ date, expiredAt }) => (todaysDate === date && hasExpired(expiredAt)));

    return (
        <>
            {expiredAttendance.map(({ subjectId,expiredAt }, key) => {
                const attendanceLog = attendanceLogs[subjectId._id];
                const attendanceStatus = attendanceLog && attendanceLog.date === todaysDate ? 'Marked' : 'Not Marked';

                return (
                    <div
                        className="w-full bg-white shadow-lg my-2 flex justify-between py-3 px-12  font-semibold text-slate-600  rounded-md border"
                        key={key}
                    >
                        <div className="flex items-center">
                            <MdOutlineSubject />
                            <span className="ml-2">{subjectId.subjectName}</span>
                        </div>
                        <div className="flex items-center">
                            <MdCalendarToday />
                            <span className="ml-2">{getFormattedDate()}</span>
                        </div>
                        <div className="flex items-center">
                            <RiAlertFill />
                            <span className="ml-2">{convertTo12HourFormat(expiredAt)}</span>
                        </div>
                        <div
                            className={`flex items-center py-2 px-6 rounded-3xl bg-${attendanceStatus === 'Marked' ? 'teal' : 'red'}-200 text-${attendanceStatus === 'Marked' ? 'teal' : 'red'}-600`}
                        >
                            <MdPendingActions />
                            <span className="ml-2">{attendanceStatus}</span>
                        </div>
                    </div>
                );
            })}
            {expiredAttendance.length === 0 && (
                <p className="w-full bg-white shadow-md my-2 flex justify-evenly py-4 font-semibold text-slate-600 rounded-md border">
                    No Expired Attendance History...
                </p>
            )}
        </>
    );
};

export default AttendanceExpired;
