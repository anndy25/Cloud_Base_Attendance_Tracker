import { Response, Request, RequestHandler, NextFunction } from "express";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cloudUpload } from "../util/cloudUpload";
import UserModel from "../models/student";

import env from "../util/validateEnv";


type Image = {
    url: string,
    publicId: string
}


export const createUser: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {


    const { personalInfo, educationalInfo, lectureInfo } = req.body;

    const { photo }: any = req.files;
    console.log(photo);

    try {
        const existingEmail = await UserModel.findOne({ email: personalInfo.email }).exec();

        if (existingEmail) {
            throw createHttpError(409, "A user with this email address already exists. Please log in instead.");
        }

        const image: Image = await cloudUpload(photo);
        personalInfo.image = image;

        const passwordHashed = await bcrypt.genSalt(env.SALT_ROUNDS)
        const hashedpassword = await bcrypt.hash(personalInfo.password, passwordHashed);

        personalInfo.password = hashedpassword;

        if (personalInfo === 'student') {
            await UserModel.create({
                personalInfo,
                educationalInfo
            });

        }
        else {
            await UserModel.create({
                personalInfo,
                lectureInfo
            });
        }

        return res.status(201).json({ message: `${personalInfo.fname} Account Created!!` });

    } catch (e) {
        next(e);
    }

}







export const login: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const { userId, password } = req.body;


    try {


        const user: any = await UserModel.findOne({ 'personalInfo.regNo': userId });

        if (!user) {
            throw createHttpError(401, "Invalid credentials");
        }

        const passwordMatch: boolean = await bcrypt.compare(password, user.personalInfo.password);

        if (!passwordMatch) {
            throw createHttpError(401, "Invalid credentials");
        }

        const { fname, email, phoneNumber, image, role, isAdmin, gender, dob } = user.personalInfo;

        const otherInfo = user.educationalInfo ? user.educationalInfo : user.lectureInfo;
        const token: string = jwt.sign({
            personalInfo: { fname, email, phoneNumber, image, role, isAdmin, gender, dob },
            otherInfo
        }, env.APP_SECRET, { expiresIn: "1d" });

        res.status(201).json({ token });
    } catch (error) {
        next(error);
    }
}



