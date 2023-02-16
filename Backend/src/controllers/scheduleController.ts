import { Response, Request, NextFunction } from "express";
import ClassModel from "../models/class";
import SubjectModel from "../models/subject";
import AttendanceModel from "../models/attendance";
import TeacherModel from "../models/teacher";
import createHttpError from "http-errors";




export const getSchedule = async (req: Request, res: Response, next: NextFunction) => {

    const { id } = req.params;

    try {

        const classDetails = await ClassModel.findById(id, { notifications: 0 }).populate([
            { path: 'departmentId', select: "departmentName" },

        ]);


        if (!classDetails) {
            throw createHttpError(409, "Class does not exist!");
        }

        const allSubjects = await SubjectModel.find(
            { departmentId: classDetails.departmentId?._id, semester: classDetails.semester }, { departmentId: 0 });

        const allTeachers = await TeacherModel.find({ departmentId: classDetails.departmentId?._id }, { fname: 1, image: 1 })

        return res.status(201).json({ classDetails, allSubjects, allTeachers });

    }
    catch (e) {
        next(e);
    }

}

export const assignLecture = async (req: Request, res: Response, next: NextFunction) => {

    const classId = req.params.id;
    const { subjectsubjectTeacherId, subjectId } = req.body;



    try {

        const isTeacherExist = await TeacherModel.findById(subjectsubjectTeacherId);

        if (!isTeacherExist) {
            throw createHttpError(409, "Teacher does not exist!");

        }
        const isClassExist = await ClassModel.findById(classId);

        if (!isClassExist) {
            throw createHttpError(409, "Class does not exist!");
        }

        const isSubjectExist = await SubjectModel.findById(subjectId);

        if (!isSubjectExist) {
            throw createHttpError(409, "Subject does not exist!");
        }


        const { _id } = await AttendanceModel.create({ subjectId, classId,attendanceDetails:{} });

        const teacher = await TeacherModel.findByIdAndUpdate(subjectsubjectTeacherId,
            { $push: { lectures: { classId, subjectId, attendanceId: _id } } }, { new: true, upsert: true })

        if (!teacher) {
            throw createHttpError(409, "Teacher does not exist!");
        }

        const classDetails = await ClassModel.findByIdAndUpdate(classId,
            {
                $set: {
                    [`classSubjects.${subjectId}`]: {
                        subjectTeacher: { fname: teacher.fname, image: teacher.image, _id: teacher._id },
                        subjectId,
                        attendanceId: _id
                    }
                }
            },
            { new: true, upsert: true })
            .select("-notifications")
            .populate([
                { path: 'departmentId', select: 'departmentName' },
            ])

        return res.status(201).json({ classDetails });
    }
    catch (e) {
        next(e);
    }

}

export const setClassSchedule = async (req: Request, res: Response, next: NextFunction) => {
    const { classId, day } = req.query;
    const { subjectId, from, to, subjectTeacherId } = req.body;
    try {

        const isTeacherExist = await TeacherModel.findById(subjectTeacherId);

        if (!isTeacherExist) {
            throw createHttpError(409, "Teacher does not exist!");

        }
        const isClassExist = await ClassModel.findById(classId);

        if (!isClassExist) {
            throw createHttpError(409, "Class does not exist!");
        }


        await TeacherModel.findByIdAndUpdate(subjectTeacherId,
            {
                $push:
                {
                    [`schedules.${day}`]: { subjectId, classId, from, to }
                }
            },
            { upsert: true })

        const classDetails = await ClassModel.findByIdAndUpdate(classId,
            {
                $push:
                {
                    [`schedules.${day}`]: { subjectId, from, to }
                }
            },
            { new: true, upsert: true })
            .select("-notifications")
            .populate([
                { path: 'departmentId', select: 'departmentName' },
            ])


        return res.status(201).json({ classDetails });

    } catch (error) {
        next(error)
    }
}







