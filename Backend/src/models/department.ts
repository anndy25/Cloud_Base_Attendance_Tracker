import { InferSchemaType, model, Schema } from "mongoose";

const departmentSchema = new Schema(
  {
    departmentName: { type: String, required: true, unique: true },
    
    intake: { type: Number, required: true },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
      },
    },
  }
);


type Department = InferSchemaType<typeof departmentSchema>;

export default model<Department>("department", departmentSchema);