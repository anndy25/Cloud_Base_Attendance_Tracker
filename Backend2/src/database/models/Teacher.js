const mongoose = require("mongoose");

const { Schema } = mongoose;
const TeacherSchema = new Schema(
  {
    teacher_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    teacherRegNo: {
      type: String,
      required: true,
    },

    teachingDetails: [],
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
      },
    },
  }
);

module.exports = mongoose.model("teachers", TeacherSchema);
