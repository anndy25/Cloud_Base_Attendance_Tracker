import { InferSchemaType, model, Schema } from "mongoose";


const attendanceSchema = new Schema(
  {
    class_id: {
      type:Schema.Types.ObjectId,
      ref: "classes",
      required: true,
    },
    subject_id: {
      type:Schema.Types.ObjectId,
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

type Attendance = InferSchemaType<typeof attendanceSchema>;

export default model<Attendance>("User", attendanceSchema);
