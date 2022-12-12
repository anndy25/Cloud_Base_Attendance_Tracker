const mongoose = require("mongoose");

const { Schema } = mongoose;
const TeacherSchema = new Schema({

    teacherInfo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    teacherRegNo: {
        type: String,
        required: true
    },

    teachingDetails: [{
        classID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'classes'
        },
        teachingSubject: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'subjects'
        },
        attendanceSheetId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'attendances'
        }
    }]


});

const TeacherInfo = mongoose.model("teachers", TeacherSchema);
module.exports = TeacherInfo;