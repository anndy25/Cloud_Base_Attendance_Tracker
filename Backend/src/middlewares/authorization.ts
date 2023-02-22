import { Request, NextFunction, Response } from "express";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";


import env from "../util/validateEnv";

export const studentAuth = (req: Request, res: Response, next: NextFunction) => {

    const cookie:string = req.cookies['jwt'];
    
    try {
        if (!cookie) throw createHttpError(401, "Unauthorized student!");
        jwt.verify(cookie, env.APP_STUDENT_SECRET, (error, payload) => {
            if (error) {
                throw createHttpError(401, "Unauthorized student!");
            }
            req.body.cookie= payload;
            next();
        })

    } catch (e) {
        next(e);
    }
}

export const teacherAuth = (req: Request, res: Response, next: NextFunction) => {

    const cookie:string = req.cookies['jwt'];

    try {
        if (!cookie) throw createHttpError(401, "Unauthorized teacher!");
        jwt.verify(cookie, env.APP_TEACHER_SECRET, (error, payload) => {
            if (error) {
                throw createHttpError(401, "Unauthorized teacher!");
            }
            req.body.cookie= payload;
            next();
        })

    } catch (e) {
        next(e);
    }
}
export const adminAuth = (req: Request, res: Response, next: NextFunction) => {

  
    const cookie:string = req.cookies['jwt'];

    try {
        if (!cookie) throw createHttpError(401, "Unauthorized admin!");
        jwt.verify(cookie, env.APP_ADMIN_SECRET, (error, payload) => {
            if (error) {
                throw createHttpError(401, "Unauthorized admin!");
            }
            req.body.cookie= payload;
            next();
        })

    } catch (e) {
        next(e);
    }
}