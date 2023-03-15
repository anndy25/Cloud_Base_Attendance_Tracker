import { Response, Request, RequestHandler, NextFunction } from "express";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import StudentModel from "../models/student";
import AdminModel from "../models/admin";
import TeacherModel from "../models/teacher";
import env from "../util/validateEnv";
import { cloudUpload, cloudImageDelete } from "../util/cloudUpload";

type Image = {

    url: string,
    publicId: string,

}

export const createUserAccount: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {

    const { body } = req;

    const photo: any = req.files?.photo;


    let UserModel: any;

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
            throw createHttpError(409, "An user with this email address already exists. Please log in instead.");
        }

        const image: Image = await cloudUpload(photo);
        body.image = image;

        const passwordHashed = await bcrypt.genSalt(env.SALT_ROUNDS)
        const hashedpassword = await bcrypt.hash(body.password, passwordHashed);

        body.password = hashedpassword;

        const user= await UserModel.create(body);

        return res.status(201).json({ message: `${body.fname} account created!!`,id:user._id});

    } catch (e) {
        next(e);
    }


}



export const userLogin: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {

    let UserModel: any;
    let APP_SECRET: string;

    if (req.body.role === 'student') {
        UserModel = StudentModel;
        APP_SECRET = env.APP_STUDENT_SECRET;
    } else if (req.body.role === 'teacher') {
        UserModel = TeacherModel;
        APP_SECRET = env.APP_TEACHER_SECRET;
    } else {
        UserModel = AdminModel;
        APP_SECRET = env.APP_ADMIN_SECRET;
    }

    try {

        const user = await UserModel.findOne({ email: req.body.email });

        if (!user) {
            throw createHttpError(401, "Invalid credentials");
        }

        const passwordMatch: boolean = await bcrypt.compare(req.body.password, user.password);

        if (!passwordMatch) {
            throw createHttpError(401, "Invalid credentials");
        }

        const { fname, email, phoneNumber, image, gender, dob, role, _id } = user;

        const token: string = jwt.sign(
            { fname, email, phoneNumber, image, gender, dob, role, _id },
            APP_SECRET
        );

        return res.status(201).json({ token });
    } catch (error) {
        next(error);
    }
}

export const findOneStudent = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        const student = await StudentModel.findOne({ _id: id }, { password: 0 }).populate([
            { path: 'departmentId', select: 'departmentName' },
            { path: 'classId', select: 'className' },
        ]);
        
        return res.status(201).send({ student })

    } catch (err) {
        next(err);
    }
}

export const findAllStudents = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const students = await StudentModel.find({}, { _id: 1 });
        return res.status(201).send({ students })

    } catch (err) {
        next(err);
    }
}

export const findAllTeachers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const teachers = await TeacherModel.find({}, { _id: 1 });
        return res.status(201).send({ teachers })

    } catch (err) {
        next(err);
    }
}

export const findOneTeacher = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        const teacher = await TeacherModel.findOne({ _id: id }, { password: 0 }).populate([
            { path: 'departmentId', select: 'departmentName' },
        ]);
       

        return res.status(201).send({ teacher })

    } catch (err) {
        next(err);
    }
}

export const deleteTeacher = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        const { image }: any = await TeacherModel.findByIdAndDelete(id);
        cloudImageDelete(image.publicId);
        return res.status(201).send("Teacher account deleted")
    } catch (err) {
        next(err);
    }

}

export const deleteStudent = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        const { image }: any = await StudentModel.findByIdAndDelete(id);
        cloudImageDelete(image.publicId);
        return res.status(201).send("Student account deleted")
    } catch (err) {
        next(err);
    }

}










