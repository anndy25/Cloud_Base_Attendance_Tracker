import createHttpError from "http-errors";
import { DocumentDefinition,FilterQuery,UpdateQuery,QueryOptions } from "mongoose";
import bcrypt from "bcrypt";
import { cloudUpload } from "../util/cloudUpload";
import UserModel,{UserDocument} from "../models/user";

import env from "../util/validateEnv";

type Image = {
    url: string,
    publicId: string
}

export const createUser=async(data:any,userphoto:any): Promise<string> =>{

    const existingEmail = await UserModel.findOne({ email: data.personalInfo.email }).exec();

    if (existingEmail) {
        throw createHttpError(409, "A user with this email address already exists. Please log in instead.");
    }

    const image:Image=await cloudUpload(userphoto);
    data.personalInfo.image=image;

    const passwordHashed =await bcrypt.genSalt(env.SALT_ROUNDS)
    const hashedpassword= await bcrypt.hash(data.personalInfo.password, passwordHashed);

    data.personalInfo.password=hashedpassword;

    await UserModel.create(data);
    


return "User Created Sucessfully!!";

}