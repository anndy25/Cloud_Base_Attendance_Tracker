const cloudinary = require("cloudinary").v2;
const UserInfo = require("../models/userInfoModel");
const StudentInfo = require("../models/studentInfoModel");
const TeacherInfo = require("../models/teacherInfoModel");
var bcrypt = require("bcrypt");

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});


const uploadImage = async(imagePath) => {

    const options = {
        width: 400,
        height: 400,
        gravity: "faces",
        crop: "fill",
        use_filename: true,
        unique_filename: true,
        overwrite: true,
        folder: 'Profiles_Photos'
    };

    try {
        const result = await cloudinary.uploader.upload(imagePath, options);
        console.log(result);
        return result;
    } catch (error) {
        console.error(error);
    }
};



const userSignUp = async(data) => {
    const isEmailPresent = await UserInfo.isThisEmailInUse(data.body.email);
    let res = {
        status: 400,
        message: "Email is already Present!!",
    };

    if (isEmailPresent) {
        const image = data.files.image;
        console.log(data.files.image);
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(data.body.password, salt);
        const { url, public_id } = await uploadImage(image.tempFilePath);
        data.body.image = { url, public_id };
        data.body.password = hashPassword;


        try {

            const { _id } = await UserInfo.create(data.body);
            if (data.body.role === 'student') {
                const { classInfo, studentRegNo, rollNumber } = data.body;
                await StudentInfo.create({ studentInfo: _id, studentRegNo, rollNumber, classInfo });


            } else {
                const { teacherRegNo } = data.body;
                await TeacherInfo.create({ teacherInfo: _id, teacherRegNo });
            }

        } catch (error) {
            console.log(error);
            res.status = 400,
                res.message = "Server Error!!"
            return res;

        }
        res.status = 200;
        res.message = "User Successfully Registered !!";
        return res;

    }

    return res;
};

module.exports = {
    userSignUp,
};