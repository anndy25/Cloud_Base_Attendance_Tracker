const mongoose = require("mongoose");
const { Schema } = mongoose;
const StudentSchema = new Schema(
  {
    student_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    studentRegNo: {
      type: String,
    },
    rollNumber: {
      type: Number,
    },
    semester: {
      type: Number,
    },
    class_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "classes",
    },
    lectures: [],
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
      },
    },
  }
);

module.exports = mongoose.model("students", StudentSchema);
