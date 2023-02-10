import { InferSchemaType, model, Schema } from "mongoose";

export interface DepartmentDocument extends Document {
  departmentName: string,
  intake: number,

}

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