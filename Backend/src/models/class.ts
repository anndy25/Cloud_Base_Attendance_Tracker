import { InferSchemaType, model, Schema } from "mongoose";

const schedule = {
  subjectTeacherId: { type: Schema.Types.ObjectId, ref: 'user' },
  subjectId: { type: Schema.Types.ObjectId, ref: 'subject' },
  from: { type: String },
  to: { type: String }
}

const classSchema = new Schema(
  {
    className: { type: String, required: true, unique: true },
    year: { type: String, required: true },
    departmentId: { type: Schema.Types.ObjectId, ref: "department",require:true },
    schedule: {
      monday: [schedule],
      tuesday: [schedule],
      wednesday:[schedule],
      thursday: [schedule],
      friday: [schedule],
      saturday: [schedule]
    },
    notification: [
      {
        subjectId: { type: Schema.Types.ObjectId, ref: 'subject' },
        attendanceId: { type: Schema.Types.ObjectId, ref: 'attendance' },
        ip: { type: String },
        expired: { type: String },
        day: { type: String }
      }
    ]
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
      },
    },
  }
);

type Class = InferSchemaType<typeof classSchema>;

export default model<Class>("class", classSchema);