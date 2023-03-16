import { Response, Request, NextFunction } from "express";
import createHttpError from "http-errors";
import StudentModel from "../models/student";
import TeacherModel from "../models/teacher";




export const adminOverview = async (req: Request, res: Response, next: NextFunction) => {

    try {

        const students = await StudentModel.find({},
            { fname: 1, email: 1, image: 1, regNo: 1, departmentId: 1, classId: 1 }).
            populate([
                { path: 'departmentId', select: 'departmentName' },
                { path: 'classId', select: 'className' }
            ]).exec();


        const teachers = await TeacherModel.find({},
            { fname: 1, email: 1, image: 1, regNo: 1, departmentId: 1, phoneNumber: 1 }).populate([
                { path: 'departmentId', select: 'departmentName' },
            ]).exec();


        return res.status(201).send({ students, teachers });

    } catch (err) {
        next(err);
    }

}

export const teacherOverview = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const day = req.query.day;
    try {
        const overview = await TeacherModel.findById(id)
            .populate({
                path: 'lectures',
                populate: [
                    { path: 'classId', select: 'className semester year' },
                    { path: 'subjectId', select: 'subjectName shortForm ' },
                ]
            })
            .populate({
                path: `schedules.${day}.subjectId schedules.${day}.classId`,
                select: 'subjectName className shortForm'
            })
            .select(`schedules.${day} lectures`)
            .lean();

        
        return res.status(201).json(overview);
    } catch (err) {
        next(err);
    }
}