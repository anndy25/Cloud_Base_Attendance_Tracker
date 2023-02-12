import { Response, Request, NextFunction } from "express";
import ClassModel from "../models/class";
import createHttpError from "http-errors";




export const addClass=async(req:Request, res:Response,next:NextFunction) => {

    try{

        const classInfo=req.body;
        const isClassExist=await ClassModel.findOne({className:classInfo.className})
    
        if(isClassExist){
            throw createHttpError(409, "Class already exist.");
        }
    
        await ClassModel.create(classInfo);
        
        return res.status(201).json({ message: `${classInfo.className} class created!!` });
    }
    catch(e){
        next(e);
    }

}

