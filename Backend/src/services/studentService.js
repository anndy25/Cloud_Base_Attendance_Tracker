const StudentInfo = require("../models/studentInfoModel");
const UserInfo = require("../models/userInfoModel");
const bcrypt = require("bcrypt");

const loginStudentController = async(credentials) => {
    const response = {}
    const { email, password } = credentials;

    try {
        let user = await UserInfo.findOne({ email });

        if (!user) {

            response.status = 401;
            response.message = "Please try to login with correct credentials!!";
            return response;

        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare || user.role === "teacher") {

            response.status = 401;
            response.message = "Please try to login with correct credentials!!";
            return response;

        } else {
            const data = await StudentInfo.findOne({ studentInfo: user._id }, { studentInfo: 0, subjectDetails: 0 })
                .populate("classInfo").exec();

            response.status = 200;
            response.message = "Login sucessfully!!";
            response.data = {
                studentName: user.name,
                studentID: user._id,
                studentRegNo: user.studentRegNo,
                rollNumber: data.rollNumber,
                className: data.classInfo.class,
                year: data.classInfo.year,
                email
            };
            return response;

        }


    } catch (err) {
        console.log(err);
        response.status = 500;
        response.message = "Internal Server Error!!";
        return response;
    }

}

module.exports = { loginStudentController };