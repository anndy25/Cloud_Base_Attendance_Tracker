const mongoose = require("mongoose");

const { Schema } = mongoose;
const SubjectSchema = new Schema({

    subjectName: {
        type: String,
        required: true,
    },
    courseCode: {
        type: Number,
        required: true,
        unique: true,
    },
    semester: {
        type: Number,
        required: true,
    },
    departmentInfo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'departments'
    }

});

const SubjectInfo = mongoose.model("subjects", SubjectSchema);
module.exports = SubjectInfo;