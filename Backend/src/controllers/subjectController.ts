import { Response, Request, NextFunction } from "express";
import SubjectModel from '../models/subject'
import createHttpError from "http-errors";

export const addSubject=async(req:Request, res:Response,next:NextFunction) => {

    try{

        const subjectInfo=req.body;
        const isSubjectExist=await SubjectModel.findOne({departmentName:subjectInfo.subjectName})
    
        if(isSubjectExist){
            throw createHttpError(409, "Subject already exist.");
        }
    
        await SubjectModel.create(subjectInfo);
        
        return res.status(201).json({ message: `${subjectInfo.subjectName} subject created!!` });
    }
    catch(e){
        next(e);
    }

}
