import { Response, Request, NextFunction } from "express";
import mongoose from 'mongoose';
import { verify } from 'hcaptcha';
import createHttpError from "http-errors";
import env from "../util/validateEnv";
import ClassModel from "../models/class";
import { hasExpired } from "../util/functions";
import AttendanceModel from "../models/attendance";
import StudentModel from "../models/student";
import TeacherModel from "../models/teacher";
import SubjectModel from "../models/subject";

export const setAttendance = async (req: Request, res: Response, next: NextFunction) => {

    const { ip, expiredAt, date, classId, teacherId, subjectId } = req.body;


    try {

        const isTeacherExist = await TeacherModel.findById(teacherId);

        if (!isTeacherExist) {
            throw createHttpError(409, "Teacher does not exist!");
        }

        const isClassExist = await ClassModel.findById(classId);

        if (!isClassExist) {
            throw createHttpError(409, "Class does not exist!");
        }


        const subjectNoty: any = await ClassModel.findOneAndUpdate(
            { _id: classId, "notifications.subjectId": subjectId },
            {
                $set: { "notifications.$.ip": ip, "notifications.$.expiredAt": expiredAt, "notifications.$.date": date }
            },
            { projection: { "notifications": 1 } }
        )

        const { notifications } = subjectNoty;
        let index = 0;
        for (let i = 0; i < notifications.length; i++) {
            if (notifications[i].subjectId == subjectId) {
                index = i;
                break;
            }
        }


        if (notifications[index].date == date) {

            await AttendanceModel.findOneAndUpdate(
                { _id: notifications[index].attendanceId, "attendanceDetails.date": date },
                { $set: { "attendanceDetails.$.expiredAt": expiredAt } }
            )
        } else {

            await AttendanceModel.findByIdAndUpdate(notifications[index].attendanceId,
                { $push: { attendanceDetails: { date, expiredAt } } })

            await ClassModel.updateOne({ _id: classId },
                { $inc: { ['classSubjects.' + subjectId + '.totalLectures']: 1 } },
            )
        }

        return res.status(201).json({ message: "Attendance is Activated" })

    } catch (err) {
        next(err);
    }

}

export const markAttendance = async (req: Request, res: Response, next: NextFunction) => {

    const { classId, subjectId }: any = req.query;
    const { studentId, currentTime, date, attendanceId, ip,token } = req.body;

    try {

        const { success } = await verify(env.H_CAPTCHA_SECRET, token);

        if (!success) {
            return res.status(400).json({ error: "Invalid Captcha" });
        }

        const isStudentExist = await StudentModel.findById(studentId);

        if (!isStudentExist) {
            throw createHttpError(409, "Student does not exist!");
        }

        const isClassExist = await ClassModel.findById(classId);

        if (!isClassExist) {
            throw createHttpError(409, "Class does not exist!");
        }
        const subject: any = await ClassModel.aggregate([
            { $match: { "_id": new mongoose.Types.ObjectId(classId) } },
            {
                $project: {
                    _id: 0, notifications: {
                        $arrayElemAt:
                            [
                                {
                                    $filter: { input: "$notifications", as: "notification", cond: { $eq: ["$$notification.subjectId", new mongoose.Types.ObjectId(subjectId)] } }
                                },
                                0
                            ]
                    }
                }
            }])

        if (subject[0].notifications.length === 0) {
            throw createHttpError(409, "Attendance doesn't exist!");
        }

        if (subject[0].notifications.ip !== ip) {
            throw createHttpError(409, "IP doesn't match!");
        }

        if (hasExpired(currentTime, subject[0].notifications.expiredAt)) {
            throw createHttpError(406, "Time Expired!");
        }

        await AttendanceModel.updateOne(
            { _id: attendanceId, "attendanceDetails.date": date },
            { $addToSet: { "attendanceDetails.$.presentStudents": studentId } });


        const attendanceLog = await StudentModel.findByIdAndUpdate(studentId,
            {
                $set: { [`attendanceLogs.${subjectId}.date`]: date, },
                $inc: { [`attendanceLogs.${subjectId}.totalAttendance`]: 1, },
            },
            { new: true })
            .select("attendanceLogs -_id");


        return res.status(201).json({attendanceLog})

    } catch (err) {
        next(err);
    }
}



export const getAttendanceInfoT = async (req: Request, res: Response, next: NextFunction) => {
    const { classId, subjectId, teacherId }: any = req.query;

    try {


        if (!mongoose.isValidObjectId(classId) || !mongoose.isValidObjectId(subjectId) || !mongoose.isValidObjectId(teacherId)) {
            throw createHttpError(409, "Id's does not exist!");
        }

        const isTeacherExist = await TeacherModel.findById(teacherId);

        if (!isTeacherExist) {
            throw createHttpError(409, "Teacher does not exist!");
        }

        const data: any = await ClassModel.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(classId) } },
            {
                $project: {
                    _id: 0, notifications: {
                        $arrayElemAt:
                            [
                                {
                                    $filter: { input: "$notifications", as: "notification", cond: { $eq: ["$$notification.subjectId", new mongoose.Types.ObjectId(subjectId)] } }
                                },
                                0
                            ]
                    }
                }
            }])

        return res.status(201).json({ notification: data[0].notifications });

    } catch (err) {
        next(err);
    }
}

export const getAttendanceInfoS = async (req: Request, res: Response, next: NextFunction) => {
    const { studentId } = req.query;

    try {

        const isStudentExist = await StudentModel.findById(studentId);

        if (!isStudentExist) {
            throw createHttpError(409, "Student does not exist!");
        }
        const { classId } = isStudentExist;
        const isClassExist = await ClassModel.findById(classId);

        if (!isClassExist) {
            throw createHttpError(409, "Class does not exist!");
        }

        const classInfo = await ClassModel.findById(classId)
            .populate({ path: 'departmentId', select: 'departmentName' })
            .populate({ path: 'notifications.subjectId', select: 'subjectName' })
            .select({ notifications: 1, classSubjects: 1, className: 1, departmentId: 1 });


        return res.status(201).json({ classInfo, attendanceLogs: isStudentExist.attendanceLogs });

    } catch (err) {
        next(err)
    }
}

export const getAttendanceDetails = async (req: Request, res: Response, next: NextFunction) => {

    const { classId, subjectId, teacherId }: any = req.query;

    try {


        if (!mongoose.isValidObjectId(classId) || !mongoose.isValidObjectId(subjectId) || !mongoose.isValidObjectId(teacherId)) {
            throw createHttpError(409, "Id's does not exist!");
        }

        const isTeacherExist = await TeacherModel.findById(teacherId);

        if (!isTeacherExist) {
            throw createHttpError(409, "Teacher does not exist!");
        }

        const isSubjectExist = await SubjectModel.findById(subjectId);

        if (!isSubjectExist) {
            throw createHttpError(409, "Subject does not exist!");
        }

        const isClassExist: any = await ClassModel.findById(classId, { classSubjects: 1, className: 1 });

        if (!isClassExist) {
            throw createHttpError(409, "Subject does not exist!");
        }

        const attendanceId = isClassExist.classSubjects.get(subjectId).attendanceId;

        const students = await StudentModel.find({ classId },
            { password: 0, departmentId: 0, gender: 0, dob: 0 });

        const attendanceDetails: any = await AttendanceModel.findById(attendanceId, { attendanceDetails: 1 });

        return res.status(201).json({ students, attendanceDetails, className: isClassExist.className, subjectName: isSubjectExist.subjectName })

    } catch (err) {
        next(err);
    }
}

export const absentStudents = async (req: Request, res: Response, next: NextFunction) => {

    const { date, subjectId, classId }: any = req.query;

    try {

        if (!mongoose.isValidObjectId(classId) || !mongoose.isValidObjectId(subjectId)) {
            throw createHttpError(409, "Id's does not exist!");
        }

        const isSubjectExist = await SubjectModel.findById(subjectId);

        if (!isSubjectExist) {
            throw createHttpError(409, "Subject does not exist!");
        }

        const isClassExist: any = await ClassModel.findById(classId, { classSubjects: 1, className: 1, _id: 0 });

        if (!isClassExist) {
            throw createHttpError(409, "Subject does not exist!");
        }
        const attendanceId = isClassExist.classSubjects.get(subjectId).attendanceId;

        const response = await AttendanceModel.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(attendanceId) } },
            { $unwind: '$attendanceDetails' },
            { $match: { 'attendanceDetails.date': date } },
            { $project: { presentStudents: '$attendanceDetails.presentStudents' } }
        ]);


        if (response.length === 0) {
            throw createHttpError(409, "Attendance does not exist!");
        }

        const absentStudents = [];
     
        const pStudents = new Set(response[0].presentStudents.map((student: any) => student.toString()));
       

        const students: any = await StudentModel.find({ classId }, { fname: 1, image: 1, regNo: 1, rollNo: 1 });

        for (let i = 0; i < students.length; i++) {
            const studentId = students[i]._id.toString();
            if (!pStudents.has(studentId)) {
                absentStudents.push(students[i]);
            }
        }


        return res.status(201).json({ absentStudents, className: isClassExist.className, subjectName: isSubjectExist.subjectName });

    } catch (err) {
        next(err);
    }
}




