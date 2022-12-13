const mongoose = require("mongoose");

const { Schema } = mongoose;
const LectureSchema = new Schema(
  {
    teacher_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    subjectName: {
      type: String,
      required: true,
    },
    className: {
      type: String,
      required: true,
    },
    semester: {
      type: Number,
      required: true,
    },
    attendance_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "attendances",
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
      },
    },
  }
);

module.exports = mongoose.model("Lectures", LectureSchema);
