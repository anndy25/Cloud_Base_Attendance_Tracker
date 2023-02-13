import { Response, Request, NextFunction } from "express";
import StudentModel from "../models/student";
import DepartmentModel from "../models/department";
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