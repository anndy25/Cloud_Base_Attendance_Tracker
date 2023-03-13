import { Response, Request, NextFunction } from "express";
import mongoose from 'mongoose';
import createHttpError from "http-errors";

import ClassModel from "../models/class";
import { hasExpired } from "../util/functions";
import AttendanceModel from "../models/attendance";
import StudentModel from "../models/student";
import TeacherModel from "../models/teacher";
import SubjectModel from "../models/subject";


declare global {
    interface Map<K, V> {
        getOrElse(key: K, defaultValue: V): V;
    }
}

Map.prototype.getOrElse = function <K, V>(key: K, defaultValue: V): V {
    return this.has(key) ? this.get(key) : defaultValue;
};


export const setAttendance = async (req: Request, res: Response, next: NextFunction) => {
    const { classId, teacherId, subjectId } = req.query;
    const { ip, expiredAt, date, attendanceId } = req.body;


    try {

        const isTeacherExist = await TeacherModel.findById(teacherId);

        if (!isTeacherExist) {
            throw createHttpError(409, "Teacher does not exist!");
        }
        const isClassExist = await ClassModel.findById(classId);

        if (!isClassExist) {
            throw createHttpError(409, "Class does not exist!");
        }

        await ClassModel.findOneAndUpdate(
            { _id: classId, "notifications.subjectId": subjectId },
            { $set: { "notifications.$.ip": ip, "notifications.$.expiredAt": expiredAt } }
        )

        const notification = await ClassModel.findOneAndUpdate(
            { _id: classId, "notifications.subjectId": { $ne: subjectId } },
            { $push: { "notifications": { attendanceId, subjectId, ip, expiredAt } } },
            { new: true }
        )

        if (notification) {
            await AttendanceModel.findByIdAndUpdate(attendanceId,
                { $push: { attendanceDetails: { date } } })
        }

        return res.status(201).json({ message: "Set Attendance!" })

    } catch (err) {
        next(err);
    }

}

export const markAttendance = async (req: Request, res: Response, next: NextFunction) => {

    const { classId, subjectId }: any = req.query;
    const { studentId, currentTime, date, attendanceId, ip } = req.body;
    try {

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


        const status = await StudentModel.findByIdAndUpdate(
            studentId, { $set: { [`status.${subjectId}`]: true } }, { new: true, upsert: true }).select("status -_id");


        return res.status(201).json(status)

    } catch (err) {
        next(err);
    }
}



export const getAttendanceInfoT = async (req: Request, res: Response, next: NextFunction) => {
    const { classId, teacherId, subjectId }: any = req.query;
    try {
        const isTeacherExist = await TeacherModel.findById(teacherId);

        if (!isTeacherExist) {
            throw createHttpError(409, "Teacher does not exist!");
        }
        const isClassExist = await ClassModel.findById(classId);

        if (!isClassExist) {
            throw createHttpError(409, "Class does not exist!");
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

        return res.status(201).json({ notifications: data[0].notifications, ip: req.ip });
    } catch (err) {
        next(err);
    }
}

export const getAttendanceInfoS = async (req: Request, res: Response, next: NextFunction) => {
    const { classId, studentId } = req.query;
    try {
        const isStudentExist = await StudentModel.findById(studentId);

        if (!isStudentExist) {
            throw createHttpError(409, "Student does not exist!");
        }
        const isClassExist = await ClassModel.findById(classId);

        if (!isClassExist) {
            throw createHttpError(409, "Class does not exist!");
        }

        const data = await ClassModel.findById(classId, { notifications: 1, _id: 0 });

        return res.status(201).json({ notifications: data?.notifications, status: isStudentExist.status, ip: req.ip });

    } catch (err) {
        next(err)
    }
}

export const getAttendanceDetails = async (req: Request, res: Response, next: NextFunction) => {

    const { classId, subjectId }: any = req.query;

    try {


        const isSubjectExist = await SubjectModel.findById(subjectId);

        if (!isSubjectExist) {
            throw createHttpError(409, "Subject does not exist!");
        }

        const isClassExist: any = await ClassModel.findById(classId, { classSubjects: 1, _id: 0 });

        if (!isClassExist) {
            throw createHttpError(409, "Subject does not exist!");
        }

        const attendanceId = isClassExist.classSubjects.get(subjectId).attendanceId;


        const students = await StudentModel.find({ classId },
            { status: 0, password: 0, role: 0, gender: 0, dob: 0, departmentId: 0, classId: 0 });

        const { attendanceDetails }: any = await AttendanceModel.findById(attendanceId, { attendanceDetails: 1, _id: 0 });


        const freqMap = new Map<string, number>();

        for (let i = 0; i < attendanceDetails.length; i++) {
            for (let j = 0; j < attendanceDetails[i].presentStudents.length; j++) {
                freqMap.set(attendanceDetails[i].presentStudents[j], freqMap.getOrElse(attendanceDetails[i].presentStudents[j], 0) + 1)
            }
        }

        return res.status(201).json({ students, attendanceDetails, map: Object.fromEntries(freqMap) })

    } catch (err) {
        next(err);
    }
}

export const absentStudents = async (req: Request, res: Response, next: NextFunction) => {
    const { date, subjectId, classId }: any = req.query;
    try {

        const isSubjectExist = await SubjectModel.findById(subjectId);

        if (!isSubjectExist) {
            throw createHttpError(409, "Subject does not exist!");
        }

        const isClassExist: any = await ClassModel.findById(classId, { classSubjects: 1, _id: 0 });

        if (!isClassExist) {
            throw createHttpError(409, "Subject does not exist!");
        }
        const attendanceId = isClassExist.classSubjects.get(subjectId).attendanceId;

        const response = await AttendanceModel.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(attendanceId) } },
            { $unwind: '$attendanceDetails' },
            { $match: { 'attendanceDetails.date': date } },
            { $project: { _id: 0, presentStudents: '$attendanceDetails.presentStudents' } }
        ]);

        const pStudents = new Set(response[0].presentStudents);

        const students: any = await StudentModel.find({ classId }, { fname: 1, image: 1, regNo: 1, rollNo: 1 });
        const absentStudents = [];

        for (let i = 0; i < students.length; i++) {
            if (!pStudents.has(students[i]._id + "")) {
                absentStudents.push(students[i]);
            }
        }


        return res.status(201).json({ absentStudents });



    } catch (err) {
        next(err);
    }
}


