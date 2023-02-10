const mongoose = require("mongoose");

const { Schema } = mongoose;
const SubjectSchema = new Schema(
  {
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
    department_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "departments",
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

module.exports = mongoose.model("subjects", SubjectSchema);
