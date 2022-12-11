const mongoose = require("mongoose");

const { Schema } = mongoose;
const AttendanceSchema = new Schema({
    teacherInfo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'teacherInfo',
        required: true
    },
    className: {
        type: String,
        required: true
    },
    subjectName: {
        type: String,
        required: true
    },
    attendanceDetails: Schema.Types.Mixed

});

const AttendanceInfo = mongoose.model("attendances", AttendanceSchema);
module.exports = AttendanceInfo;