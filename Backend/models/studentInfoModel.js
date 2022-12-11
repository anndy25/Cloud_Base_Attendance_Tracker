const mongoose = require("mongoose");
const { Schema } = mongoose;
const StudentSchema = new Schema({

    studentInfo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    studentRegNo: {
        type: String,
        unique: true
    },
    rollNumber: {
        type: Number,
        unique: true
    },
    classInfo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'classes'
    },

    subjectDetails: [{

            subjectName: {
                type: String
            },
            subjectTeacherName: {
                type: String
            },
            attendanceSheetId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'attendances'
            }
        },

    ]

});

const StudentInfo = mongoose.model("students", StudentSchema);
module.exports = StudentInfo;