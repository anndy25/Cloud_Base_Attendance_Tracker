import { InferSchemaType, model, Schema } from "mongoose";



const subjectSchema = new Schema(
  {
    subjectName: { type: String, required: true },
    courseCode: { type: Number, required: true, unique: true },
    semester: { type: Number, required: true },
    departmentId: { type: Schema.Types.ObjectId, ref: "department" },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
      },
    },
  }
);

type Subject = InferSchemaType<typeof subjectSchema>;

export default model<Subject>("subject", subjectSchema);
