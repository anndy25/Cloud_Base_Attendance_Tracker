import { InferSchemaType, model, Schema, Types } from "mongoose";


const departmentSchema = new Schema(
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



module.exports = mongoose.model("departments", DepartmentSchema);
