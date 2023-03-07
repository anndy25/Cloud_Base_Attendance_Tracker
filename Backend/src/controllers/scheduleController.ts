import { Response, Request, NextFunction } from "express";
import ClassModel from "../models/class";
import SubjectModel from "../models/subject";
import AttendanceModel from "../models/attendance";
import TeacherModel from "../models/teacher";
import createHttpError from "http-errors";
import mongoose from 'mongoose';


export const getSchedule = async (req: Request, res: Response, next: NextFunction) => {

    const { id } = req.params;

    try {

        const classDetails = await ClassModel.findById(id, { notifications: 0 }).populate([
            { path: 'departmentId', select: "departmentName" },

        ]);


        if (!classDetails) {
            throw createHttpError(409, "Class does not exist!");
        }

        const allSubjects = await SubjectModel.find({ departmentId: classDetails.departmentId?._id, semester: classDetails.semester }, { departmentId: 0 });

        const allTeachers = await TeacherModel.find({ departmentId: classDetails.departmentId?._id }, { fname: 1, image: 1 })


        return res.status(201).json({ classDetails, allSubjects, allTeachers });

    }
    catch (e) {
        next(e);
    }

}


export const assignLecture = async (req: Request, res: Response, next: NextFunction) => {

    const classId = req.params.id;
    const { subjectTeacherId, subjectId, attendanceId } = req.body;

    try {

        const isTeacherExist = await TeacherModel.findById(subjectTeacherId);

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


        if (attendanceId) {
            const { fname, image, _id } = isTeacherExist;
            // eslint-disable-next-line prefer-const
            let classDetails: any = await ClassModel.aggregate([

                { $match: { "_id": new mongoose.Types.ObjectId(classId) } },
                {
                    $project: {

                        monday: { $filter: { input: "$schedules.monday", as: "monday", cond: { $eq: ["$$monday.subjectId", new mongoose.Types.ObjectId(subjectId)] } } },
                        tuesday: { $filter: { input: "$schedules.tuesday", as: "tuesday", cond: { $eq: ["$$tuesday.subjectId", new mongoose.Types.ObjectId(subjectId)] } } },
                        wednesday: { $filter: { input: "$schedules.wednesday", as: "wednesday", cond: { $eq: ["$$wednesday.subjectId", new mongoose.Types.ObjectId(subjectId)] } } },
                        thursday: { $filter: { input: "$schedules.thursday", as: "thursday", cond: { $eq: ["$$thursday.subjectId", new mongoose.Types.ObjectId(subjectId)] } } },
                        friday: { $filter: { input: "$schedules.friday", as: "friday", cond: { $eq: ["$$friday.subjectId", new mongoose.Types.ObjectId(subjectId)] } } },
                        saturday: { $filter: { input: "$schedules.saturday", as: "saturday", cond: { $eq: ["$$saturday.subjectId", new mongoose.Types.ObjectId(subjectId)] } } },
                    },
                },
                {
                    $addFields: {
                        "monday.classId": classId, "tuesday.classId": classId,
                        "wednesday.classId": classId, "thursday.classId": classId,
                        "friday.classId": classId, "saturday.classId": classId,
                    }
                },


            ])
            classDetails = classDetails[0];

            const data = await ClassModel.findByIdAndUpdate(classId,
                {
                    $set: {
                        [`classSubjects.${subjectId}.subjectTeacher`]: {
                            fname, image, _id
                        }
                    }
                },
                { new: true, upsert: true })
                .select("classSubjects schedules")


            //    eslint-disable-next-line prefer-const
            let { schedules }: any = await TeacherModel.findByIdAndUpdate(subjectTeacherId, {
                $addToSet: {
                    "lectures": { classId, subjectId, attendanceId }
                }
            }, { new: true })


            if (classDetails['monday'].length > 0) {
                schedules['monday'].push(...classDetails['monday']);
            }
            if (classDetails['tuesday'].length > 0) {
                schedules['tuesday'].push(...classDetails['tuesday']);
            }
            if (classDetails['wednesday'].length > 0) {
                schedules['wednesday'].push(...classDetails['wednesday']);
            }
            if (classDetails['thursday'].length > 0) {
                schedules['thursday'].push(...classDetails['thursday']);
            }
            if (classDetails['friday'].length > 0) {
                schedules['friday'].push(...classDetails['friday'])
            }
            if (classDetails['saturday'].length > 0) {
                schedules['saturday'].push(...classDetails['saturday']);
            }

            await TeacherModel.findByIdAndUpdate(subjectTeacherId, {
                $set: {
                    "schedules": {
                        "monday": schedules['monday'],
                        "tuesday": schedules['tuesday'],
                        "wednesday": schedules['wednesday'],
                        "thursday": schedules['thursday'],
                        "friday": schedules['friday'],
                        "saturday": schedules['saturday'],
                    }
                }
            })

            return res.status(201).json({ classSubjects: data.classSubjects, schedules: data.schedules });

        } else {

            const { _id } = await AttendanceModel.create({ subjectId, classId, attendanceDetails: {} });

            const teacher = await TeacherModel.findByIdAndUpdate(subjectTeacherId,
                { $addToSet: { lectures: { classId, subjectId, attendanceId: _id } } }, { new: true, upsert: true })


            const data = await ClassModel.findByIdAndUpdate(classId,
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
                .select("classSubjects schedules")


            return res.status(201).json({ classSubjects: data.classSubjects, schedules: data.schedules });
        }
    }
    catch (e) {
        next(e);
    }

}

export const removeSubjectTeacher = async (req: Request, res: Response, next: NextFunction) => {
    const classId = req.params.id;
    const { subjectTeacherId, subjectId } = req.body;


    try {
        const isTeacherExist = await TeacherModel.findById(subjectTeacherId);

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

        await TeacherModel.findByIdAndUpdate(subjectTeacherId, {
            $pull: {
                "lectures": { classId, subjectId },
                "schedules.monday": { classId, subjectId },
                "schedules.tuesday": { classId, subjectId },
                "schedules.wednesday": { classId, subjectId },
                "schedules.thursday": { classId, subjectId },
                "schedules.friday": { classId, subjectId },
                "schedules.saturday": { classId, subjectId }
            }
        })

        const data = await ClassModel.findByIdAndUpdate(classId,
            {
                $unset: { [`classSubjects.${subjectId}.subjectTeacher`]: "" }
            }, { new: true }).select("classSubjects schedules")

        return res.status(201).json({ classSubjects: data?.classSubjects, schedules: data?.schedules });
    } catch (err) {
        next(err);
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
        )

        const schedules = await ClassModel.findByIdAndUpdate(classId,
            {
                $push:
                {
                    [`schedules.${day}`]: { subjectId, from, to }
                }
            },
            { new: true }).select("schedules")

        return res.status(201).json(schedules);

    } catch (error) {
        next(error)
    }
}

export const changeClassSchedule = async (req: Request, res: Response, next: NextFunction) => {
    const { classId, day, from, to } = req.query;
    console.log(day, from, to)
    const { subjectTeacherId, subjectId } = req.body;
    try {
        const isTeacherExist = await TeacherModel.findById(subjectTeacherId);

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

        await TeacherModel.findByIdAndUpdate(subjectTeacherId, {
            $pull: { [`schedules.${day}`]: { classId, subjectId, from, to } }
        })

        const schedules = await ClassModel.findByIdAndUpdate(classId,
            {
                $pull: { [`schedules.${day}`]: { subjectId, from, to } }
            }, { new: true })
            .select("schedules")

        return res.status(201).json(schedules);
    } catch (error) {
        next(error)
    }

}







