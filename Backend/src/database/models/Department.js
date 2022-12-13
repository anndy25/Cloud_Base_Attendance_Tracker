const mongoose = require("mongoose");

const { Schema } = mongoose;
const DepartmentSchema = new Schema(
  {
    departmentName: {
      type: String,
      required: true,
      unique: true,
    },
    intake: {
      type: Number,
      required: true,
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

DepartmentSchema.statics.isThisDepartmentInUse = async function (name) {
  try {
    const result = await this.findOne({ name });
    if (result) return false;
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

module.exports = mongoose.model("departments", DepartmentSchema);
