import { Response, Request, NextFunction } from "express";
import mongoose from 'mongoose';
import createHttpError from "http-errors";

import ClassModel from "../models/class";
import { hasExpired } from "../util/functions";
import AttendanceModel from "../models/attendance";
import StudentModel from "../models/student";
import TeacherModel from "../models/teacher";


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
            studentId,{ $set: { [`status.${subjectId}`]: true } },{ new: true, upsert: true }).select("status -_id");

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

        const data: any =await ClassModel.aggregate([
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

        return res.status(201).json({notifications:data[0].notifications, ip: req.ip });
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

        const data= await ClassModel.findById(classId, { notifications: 1, _id: 0 });

        return res.status(201).json({ notifications:data?.notifications, status: isStudentExist.status, ip: req.ip });

    } catch (err) {
        next(err)
    }
}




