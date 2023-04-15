import { Response, Request, NextFunction } from "express";
import mongoose from 'mongoose';
import ClassModel from "../models/class";
import StudentModel from "../models/student"
import createHttpError from "http-errors";

interface Schedule {
    subjectId: {
        _id: string;
        subjectName: string;
        shortForm: string;
    };
    from: string;
    to: string;
    _id: string;
}

export const addClass = async (req: Request, res: Response, next: NextFunction) => {

    try {

        const classInfo = req.body;

        const isClassExist = await ClassModel.findOne({ className: classInfo.className })

        if (isClassExist) {
            throw createHttpError(409, "Class already exist.");
        }

        await ClassModel.create(classInfo);

        return res.status(201).json({ message: `${classInfo.className} class created!!` });
    }
    catch (e) {
        next(e);
    }

}

export const getClasses = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const classes = await ClassModel.find({}, { schedules: 0, notifications: 0, classSubjects: 0 }).populate({ path: 'departmentId', select: "departmentName" }).sort('className');
        const strength = await StudentModel.aggregate([
            {
                $group: {
                    _id: "$classId",
                    count: { $sum: 1 }
                }
            }
        ])
        return res.status(201).json({ classes, strength });
    }
    catch (e) {
        next(e);
    }

}


export const getClassTimetable = async (req: Request, res: Response, next: NextFunction) => {
    const { day, studentId }: any = req.query;
    try {
        if (!mongoose.isValidObjectId(studentId)) {
            throw createHttpError(409, "Id's does not exist!");
        }
        const isStudentExist = await StudentModel.findById(studentId, { classId: 1 });

        if (!isStudentExist) {
            throw createHttpError(409, "Teacher does not exist!");
        }

        const { classId } = isStudentExist;

        const schedule: any = await ClassModel.findById(classId).
            populate({
                path: `schedules.${day}.subjectId`,
                select: 'subjectName className shortForm'
            })
            .select(`schedules.${day}`)
            .lean();


        // Sort the schedules by the 'from' time
        schedule.schedules[day].sort((a: Schedule, b: Schedule) => {
            const timeA = parseInt(a.from.replace(':', ''));
            const timeB = parseInt(b.from.replace(':', ''));
            if (timeA < timeB) {
                return -1;
            }
            if (timeA > timeB) {
                return 1;
            }
            return 0;
        });

        return res.status(200).json(schedule);

    } catch (err) {
        next(err);
    }

}






