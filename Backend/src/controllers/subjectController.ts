import { Response, Request, NextFunction } from "express";
import SubjectModel from '../models/subject'
import ClassModel from "../models/class"
import createHttpError from "http-errors";

export const addSubject = async (req: Request, res: Response, next: NextFunction) => {

    try {

        const subjectInfo = req.body;
        const isSubjectExist = await SubjectModel.findOne({ departmentName: subjectInfo.subjectName })

        if (isSubjectExist) {
            throw createHttpError(409, "Subject already exist.");
        }

        await SubjectModel.create(subjectInfo);

        return res.status(201).json({ message: `${subjectInfo.subjectName} subject created!!` });
    }
    catch (e) {
        next(e);
    }

}

export const getSubjects = async (req: Request, res: Response, next: NextFunction) => {
    const { classId } = req.params;
    try {
        const classDetails = await ClassModel.findById(classId);

        if (!classDetails) {
            throw createHttpError(409, "Class does not exist!");
        }

        const allSubjects = await SubjectModel.find({ departmentId: classDetails.departmentId, semester: classDetails.semester }, { departmentId: 0 });


        return res.status(201).json(allSubjects);


    } catch (error) {
        next(error);
    }

}
