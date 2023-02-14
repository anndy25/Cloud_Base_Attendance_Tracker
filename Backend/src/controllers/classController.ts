import { Response, Request, NextFunction } from "express";
import ClassModel from "../models/class";
import StudentModel from "../models/student"
import createHttpError from "http-errors";


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

        const classes = await ClassModel.find({}, { schedule: 0, notification: 0 }).populate({ path: 'departmentId', select: "departmentName" });
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

export const getSchedule = async (req: Request, res: Response, next: NextFunction) => {

    const { id } = req.params;

    try {

        const schedule = await ClassModel.findById(id, { notification: 0}).populate({ path: 'departmentId', select: "departmentName" });

        if(!schedule){
            throw createHttpError(409, "Class does not exist!");
        }
        return res.status(201).json({ schedule });
    }
    catch (e) {
        next(e);
    }

}
