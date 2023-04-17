import React from 'react'
import {convertToAmPm} from "../../functions/time"





const ScheduleCard = ({ schedules }) => {
  return (
    <>
      {
        schedules.map((schedule, key) => {
          const class_ = schedule.classId ? `(${schedule.classId.className})` : "";
          return (
            <div key={key} className={`p-2 my-1 text-indigo-600  bg-indigo-50 cursor-pointer  border border-indigo-600 rounded-md`}>
              <div>{convertToAmPm(schedule.from)}-{convertToAmPm(schedule.to)} : {schedule.subjectId.shortForm}  {class_} </div>
              <p></p>
            </div>
          )
        }
        )
      }
    </>
  )
}

export default ScheduleCard