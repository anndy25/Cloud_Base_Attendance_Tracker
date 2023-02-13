import { Request, NextFunction, Response } from "express";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";


import env from "../util/validateEnv";

export const studentAuth = (req: Request, res: Response, next: NextFunction) => {

    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    )
        token = req.headers.authorization.split(" ")[1];

    try {
        if (!token) throw createHttpError(401, "Unauthorized student!");
        jwt.verify(token, env.APP_STUDENT_SECRET, (error, payload) => {
            if (error) {
                throw createHttpError(401, "Unauthorized student!");
            }
            req.body.token= payload;
            next();
        })

    } catch (e) {
        next(e);
    }
}

export const teacherAuth = (req: Request, res: Response, next: NextFunction) => {

    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    )
        token = req.headers.authorization.split(" ")[1];

    try {
        if (!token) throw createHttpError(401, "Unauthorized teacher!");
        jwt.verify(token, env.APP_TEACHER_SECRET, (error, payload) => {
            if (error) {
                throw createHttpError(401, "Unauthorized teacher!");
            }
            req.body.token= payload;
            next();
        })

    } catch (e) {
        next(e);
    }
}
export const adminAuth = (req: Request, res: Response, next: NextFunction) => {

    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    )
        token = req.headers.authorization.split(" ")[1];

    try {
        if (!token) throw createHttpError(401, "Unauthorized teacher!");
        jwt.verify(token, env.APP_ADMIN_SECRET, (error, payload) => {
            if (error) {
                throw createHttpError(401, "Unauthorized teacher!");
            }
            req.body.token= payload;
            next();
        })

    } catch (e) {
        next(e);
    }
}