const mongoose = require("mongoose");

const { Schema } = mongoose;
const AttendanceSchema = new Schema(
  {
    class_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "classes",
      required: true,
    },
    subject_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "classes",
      required: true,
    },
    attendanceDetails: Schema.Types.Mixed,
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
      },
    },
  }
);
module.exports = mongoose.model("attendances", AttendanceSchema);
