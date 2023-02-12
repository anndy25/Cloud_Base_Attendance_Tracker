import { Response, Request, RequestHandler, NextFunction } from "express";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cloudUpload } from "../util/cloudUpload";

import StudentModel from "../models/student";
import AdminModel from "../models/admin";
import TeacherModel from "../models/teacher";
import env from "../util/validateEnv";

type Image = {
    url: string,
    publicId: string,

}


export const createUserAccount: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {

    const { body } = req;
    const { photo }: any = req.files;

    let UserModel:any;

    if (body.role === 'student') {
        UserModel = StudentModel;
    } else if (body.role === 'teacher') {
        UserModel = TeacherModel;
    } else {
        UserModel = AdminModel;
    }

    try {

        const existingEmail = await UserModel.findOne({ email: body.email })

        if (existingEmail) {
            throw createHttpError(409, "A user with this email address already exists. Please log in instead.");
        }

        const image: Image = await cloudUpload(photo);
        body.image = image;


        const passwordHashed = await bcrypt.genSalt(env.SALT_ROUNDS)
        const hashedpassword = await bcrypt.hash(body.password, passwordHashed);

        body.password = hashedpassword;

        await UserModel.create(body);

        return res.status(201).json({ message: `${body.fname} account created!!` });

    } catch (e) {
        next(e);
    }


}







export const userLogin: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const { userId, password } = req.body;

    try {

        const user: any = await StudentModel.findOne({ 'educationalInfo.regNo': userId });

        if (!user) {
            throw createHttpError(401, "Invalid credentials");
        }

        const passwordMatch: boolean = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            throw createHttpError(401, "Invalid credentials");
        }

        const { fname, email, phoneNumber, image, role, gender, dob } = user;

        const otherInfo = user.educationalInfo ? user.educationalInfo : user.lectureInfo;
        const token: string = jwt.sign({
            personalInfo: { fname, email, phoneNumber, image, role, gender, dob },
            otherInfo
        }, env.APP_SECRET, { expiresIn: "1d" });

        res.status(201).json({ token });
    } catch (error) {
        next(error);
    }
}

export const adminLogin: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const { body } = req;

    try {

        const user = await AdminModel.findOne({ email: body.email });

        if (!user) {
            throw createHttpError(401, "Invalid credentials");
        }

        const passwordMatch: boolean = await bcrypt.compare(body.password, user.password);

        if (!passwordMatch) {
            throw createHttpError(401, "Invalid credentials");
        }

        const { fname, email, phoneNumber, image, gender, dob } = user;

        const token: string = jwt.sign({
            personalInfo: { fname, email, phoneNumber, image, gender, dob },
        }, env.APP_SECRET, { expiresIn: "1d" });

        res.status(201).json({ token });
    } catch (error) {
        next(error);
    }
}






