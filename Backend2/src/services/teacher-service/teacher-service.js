const TeacherInfo = require("../models/teacherInfoModel");
const UserInfo = require("../models/userInfoModel");
const bcrypt = require("bcrypt");

const teacherLoginController = async(credentials) => {
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
        if (!passwordCompare || user.role === "student") {

            response.status = 401;
            response.message = "Please try to login with correct credentials!!";
            return response;

        } else {
            const { teachingDetails, teacherRegNo } = await TeacherInfo.findOne({ teacherInfo: user._id })
                .select('teachingDetails teacherRegNo')
                .populate({ path: 'teachingDetails.classID', select: 'class' })
                .populate({ path: 'teachingDetails.teachingSubject', select: 'subjectName' })
                .exec();

            response.status = 200;
            response.message = "Login sucessfully!!";
            response.teacherName = user.name;
            response.teacherRegNo = teacherRegNo;
            response.email = email;
            response.subjects = teachingDetails.map((data, i) => {
                return {
                    subject: data.teachingSubject.subjectName,
                    class: data.classID.class,
                    classID: data.classID._id,
                    attendanceSheetId: data.attendanceSheetId,
                }

            })
            return response;

        }


    } catch (err) {
        console.log(err);
        response.status = 500;
        response.message = "Internal Server Error!!";
        return response;
    }

}



module.exports = { teacherLoginController };