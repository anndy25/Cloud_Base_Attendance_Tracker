const { findByIdAndUpdate } = require("../models/attendanceInfoModel");
const AttendanceInfo = require("../models/attendanceInfoModel");
const StudentInfo = require("../models/studentInfoModel");
const TeacherInfo = require("../models/teacherInfoModel");

const assignLecturesToTeacher = async(data) => {
    try {
        const { teacherID, subjectTeacherName, classID, className, subjectID, subjectName } = data;

        const { _id } = await AttendanceInfo.create({
            className,
            subjectName,
            teacherInfo: teacherID
        });

        await TeacherInfo.findOneAndUpdate({ teacherInfo: teacherID }, {
            $push: {
                teachingDetails: {
                    classID,
                    teachingSubject: subjectID,
                    attendanceSheetId: _id
                }
            }
        });


        await StudentInfo.updateMany({ classInfo: classID }, {
            $push: {
                subjectDetails: {
                    subjectName,
                    subjectTeacherName,
                    attendanceSheetId: _id
                }
            }
        });

        return {
            message: "Lecture assigned!!",
            status: 200
        }

    } catch (error) {
        console.log(error);
        return {
            message: "Server error!!",
            status: 400
        }

    }

};

module.exports = {
    assignLecturesToTeacher
}