const { UserModel, StudentModel, TeacherModel, LectureModel } = require("../../models");
const { APIError, STATUS_CODES } = require("../../../utils/app-errors");

class AdminUserRepository {
  constructor() {
    this.message = null;
  }
  async userRegistration(data) {
    try {
      const { _id } = await UserModel.create(data);
      
      if (data.role === "student") {
        const { class_id, studentRegNo, rollNumber, semester } = data;
        await StudentModel.create({
          student_id: _id,
          studentRegNo,
          rollNumber,
          class_id,
          semester,
        });
       
        this.message = "Student Registration Successfully Done !!";
      } else {
        const { teacherRegNo } = data;
        await TeacherModel.create({ teacher_id: _id, teacherRegNo });
        this.message = "Teacher Registration Successfully Done !!";
      }

      return { message: this.message };
    } catch (err) {
      console.log(err);
      throw APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        `Unable to create ${data.role} account !!`
      );
    }
  }

  async userDeletion({ _id }) {
    let role_;
    try {
      const role = await UserModel.findOneAndDelete({ _id }).select('role');;
      role_ = role;
      if (role === "student") {
        await StudentModel.deleteOne({ student_id: _id });
        this.message = "Student Account Successfully Deleted !!";
      } else {
        await TeacherModel.deleteOne({ teacher_id: _id });
        await LectureModel.deleteMany({ teacher_id: _id });
        this.message = "Teacher Account Successfully Deleted !!";
      }
      return { message: this.message };
    } catch (err) {
      throw APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        `Unable to delete ${role_} account !!`
      );
    }
  }

  async updateStudentDetails({ data }, params, className = null) {
    try {
      const class_id = await StudentModel.findOne({ student_id: data._id }).select('class_id');
      if (data.class_id !== class_id) {
        const lectures = await LectureModel.find({ className }).select('_id');
        console.log(lectures);
        data.lectures = lectures;
      }
      await StudentModel.findByIdAndUpdate(params, { $set: data });
      return { message: "Student Details Sucessfully Updated" };

    } catch (err) {
      throw APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to update student !!"
      );
    }
  }
}

module.exports = AdminUserRepository;
