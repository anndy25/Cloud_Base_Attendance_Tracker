import { Response, Request, NextFunction } from "express";
import DepartmentModel from "../models/department";
import createHttpError from "http-errors";


export const addDepartment=async(req:Request, res:Response,next:NextFunction) => {

    try{

        const departmentInfo=req.body;
        const isDepartmentExist=await DepartmentModel.findOne({departmentName:departmentInfo.departmentName})
    
        if(isDepartmentExist){
            throw createHttpError(409, "Department already exist.");
        }
    
        await DepartmentModel.create(departmentInfo);
        
        return res.status(201).json({ message: `${departmentInfo.departmentName} Department created!!` });
    }
    catch(e){
        next(e);
    }

}

