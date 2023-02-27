import { Request, NextFunction, Response } from "express";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";


import env from "../util/validateEnv";

export const studentAuth = (req: Request, res: Response, next: NextFunction) => {

    const cookie:any= req.headers.cookies ? req.headers.cookies:req.cookies.auth;
   
    
    try {
        if (!cookie) throw createHttpError(401, "Unauthorized student!");
        jwt.verify(cookie, env.APP_STUDENT_SECRET, (error:any, payload:any) => {
            if (error) {
                throw createHttpError(401, "Unauthorized student!");
            }
           
            next();
        })

    } catch (e) {
        next(e);
    }
}

export const teacherAuth = (req: Request, res: Response, next: NextFunction) => {

   const cookie:any= req.headers.cookies ? req.headers.cookies:req.cookies.auth
    
    try {
        if (!cookie) throw createHttpError(401, "Unauthorized teacher!");
        jwt.verify(cookie, env.APP_TEACHER_SECRET, (error:any, payload:any) => {
            if (error) {
                throw createHttpError(401, "Unauthorized teacher!");
            }
           
            next();
        })

    } catch (e) {
        next(e);
    }
}
export const adminAuth = (req: Request, res: Response, next: NextFunction) => {
    
    const cookie:any= req.headers.cookies ? req.headers.cookies:req.cookies.auth

    try {
        if (!cookie) throw createHttpError(401, "Unauthorized teacher!");
        jwt.verify(cookie, env.APP_ADMIN_SECRET, (error:any, payload:any) => {
            if (error) {
                throw createHttpError(401, "Unauthorized admin!");
            }

            next();
        })

    } catch (e) {
        next(e);
    }
}

 