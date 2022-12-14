const { LectureModel,AttendanceModel,TeacherModel,StudentModel }= require("../../models");
const { APIError, STATUS_CODES } = require("../../../utils/app-errors");

class AdminLectureRepository{
    async lectureAllotment(data){
        try {
            const { teacher_id,class_id, semester, className, subjectName } = data;

            let attendanceDetails={}
            const { _id } =await AttendanceModel.create({teacher_id,class_id,attendanceDetails});
            const lecture=await LectureModel.create({teacher_id,semester,className,subjectName,attendance_id:_id});
            
            await TeacherModel.findByIdAndUpdate({_id:teacher_id},{$push:{teachingDetails:lecture._id}})
            await StudentModel.updateMany({class_id},{$push:{lectures:lecture._id}})
            
            return {
                message: "Lecture Alloted !!",
                status: 200
            }
            
    
        } catch(err){
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Find Product')
        }
    
    };

    
}

module.exports = AdminLectureRepository;

