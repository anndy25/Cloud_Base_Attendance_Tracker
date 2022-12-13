const mongoose = require("mongoose");

const { Schema } = mongoose;
const ClassSchema = new Schema(
  {
    class: {
      type: String,
      required: true,
    },
    year: {
      type: String,
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

module.exports = mongoose.model("classes", ClassSchema);
