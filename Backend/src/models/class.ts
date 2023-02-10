import { InferSchemaType, model, Schema, Types } from "mongoose";


interface Content {
  subjectTeacherId?: Types.ObjectId;
  subjectId?: Types.ObjectId;
  from?: string;
  to?: string
}

interface Days {
  monday: Array<Content>;
  tuesday: Array<Content>;
  wednesday: Array<Content>;
  thursday: Array<Content>;
  friday: Array<Content>;
  saturday: Array<Content>;
}

interface List {

  subjectId: Types.ObjectId;
  ip: string;
  attendanceId: Types.ObjectId;
  expired: string;
  day: string;

}


export interface ClassDocument extends Document {
  className: string;
  year: string;
  departmentId: Types.ObjectId;
  schedule?: Days;
  notification?: Array<List>;
}


const classSchema = new Schema(
  {
    className: { type: String, required: true },
    year: { type: String, required: true },
    departmentId: { type: Schema.Types.ObjectId, ref: "departments" },
    schedule: {
      monday: [
        {
          subjectTeacherId: { type: Schema.Types.ObjectId, ref: 'users' },
          subjectId: { type: Schema.Types.ObjectId, ref: 'subjects' },
          from: { type: String },
          to: { type: String }
        }
      ],
      tuesday: [
        {
          subjectTeacherId: { type: Schema.Types.ObjectId, ref: 'users' },
          subjectId: { type: Schema.Types.ObjectId, ref: 'subjects' },
          from: { type: String },
          to: { type: String }
        }
      ],
      wednesday: [
        {
          subjectTeacherId: { type: Schema.Types.ObjectId, ref: 'users' },
          subjectId: { type: Schema.Types.ObjectId, ref: 'subjects' },
          from: { type: String },
          to: { type: String }
        }
      ],
      thursday: [
        {
          subjectTeacherId: { type: Schema.Types.ObjectId, ref: 'users' },
          subjectId: { type: Schema.Types.ObjectId, ref: 'subjects' },
          from: { type: String },
          to: { type: String }
        }
      ],
      friday: [
        {
          subjectTeacherId: { type: Schema.Types.ObjectId, ref: 'users' },
          subjectId: { type: Schema.Types.ObjectId, ref: 'subjects' },
          from: { type: String },
          to: { type: String }
        }
      ],
      saturday: [
        {
          subjectTeacherId: { type: Schema.Types.ObjectId, ref: 'users' },
          subjectId: { type: Schema.Types.ObjectId, ref: 'subjects' },
          from: { type: String },
          to: { type: String }
        }
      ]
    },
    notification: [
      {
        subjectId: { type: Schema.Types.ObjectId, ref: 'subjects' },
        attendanceId: { type: Schema.Types.ObjectId, ref: 'attendances'},
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