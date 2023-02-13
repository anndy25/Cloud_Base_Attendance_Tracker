import { Response, Request, NextFunction } from "express";
import DepartmentModel from "../models/department";
import createHttpError from "http-errors";




export const addDepartment=async(req:Request, res:Response,next:NextFunction) => {

    try{

        const DepartmentInfo=req.body;
        const isDepartmentExist=await DepartmentModel.findOne({departmentName:DepartmentInfo.DepartmentName})
    
        if(isDepartmentExist){
            throw createHttpError(409, "Department already exist.");
        }
    
        await DepartmentModel.create(DepartmentInfo);
        
        return res.status(201).json({ message: `${DepartmentInfo.departmentName} Department created!!` });
    }
    catch(e){
        next(e);
    }

}

