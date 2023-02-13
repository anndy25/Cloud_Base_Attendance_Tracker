import { Response, Request, NextFunction } from "express";
import StudentModel from "../models/student";
import DepartmentModel from "../models/department";
import TeacherModel from "../models/teacher";



export const adminOverview = async (req: Request, res: Response, next: NextFunction) => {
    try {
        //  await DepartmentModel.create({departmentName:"Information Technology",intake:180});
        //  await DepartmentModel.create({departmentName:"Computer Engineering",intake:240});
        //  await DepartmentModel.create({departmentName:"Electronics and Telecommunications",intake:240});
        // const teachers=await TeacherModel.find({},{fname:1,email:1,image:1,regNo:1,departmentId:1,phoneNumber:1}).
        // populate([
        //     {path: 'departmentId', select: 'departmentName'}
        // ]).exec();
        const students = await StudentModel.find({}, { fname: 1, email: 1, image: 1, regNo: 1, classId: 1, departmentId: 1 }).populate("departmentId").exec();



        return res.status(201).send(students);

    } catch (err) {
        next(err);
    }

}