import { InferSchemaType, model, Schema } from "mongoose";


const schedule = {

  subjectId: { type: Schema.Types.ObjectId, ref: 'subject' },
  from: { type: String },
  to: { type: String }

}

const classSchema = new Schema(
  {
    className: { type: String, required: true, unique: true },
    year: { type: String, required: true },
    departmentId: { type: Schema.Types.ObjectId, ref: "department", required: true, },
    semester: { type: Number, required: true },
    classSubjects:
    {
      type: Map,
      of: {
        subjectTeacher: {},
        attendanceId: { type: Schema.Types.ObjectId, ref: 'attendance', required: true },
        totalLectures: { type: Number, default: 0 }
      },
      default: {}
    }
    ,
    schedules: {
      monday: [schedule],
      tuesday: [schedule],
      wednesday: [schedule],
      thursday: [schedule],
      friday: [schedule],
      saturday: [schedule]
    },
    notifications: [
      {
        subjectId: { type: Schema.Types.ObjectId, ref: 'subject' },
        attendanceId: { type: Schema.Types.ObjectId, ref: 'attendance' },
        ip: { type: String, default: "" },
        expiredAt: { type: String, default: "" },
        date: { type: String, default: "" }
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