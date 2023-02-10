import { InferSchemaType, model, Schema,Types} from "mongoose";

export interface UserDocument extends Document {
    
    subjectName: string,
    courseCode:number,
    semester:number,
    departmentId:Types.ObjectId
    
}

const subjectSchema = new Schema(
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
    departmentId: {
      type: Schema.Types.ObjectId,
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

type Subject = InferSchemaType<typeof subjectSchema>;

export default model<Subject>("subjects", subjectSchema);
