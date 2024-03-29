import { InferSchemaType, model, Schema } from "mongoose";

const attendanceSchema = new Schema(
    {
        classId: { type: Schema.Types.ObjectId, ref: "class", required: true },
        subjectId: { type: Schema.Types.ObjectId, ref: "subject", required: true },
        attendanceDetails:
            [
                {
                    date: { type: String},
                    expiredAt: { type: String },
                    presentStudents: [{ type: Schema.Types.ObjectId, ref: 'student' }]
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

type Attendance = InferSchemaType<typeof attendanceSchema>;

export default model<Attendance>("attendance", attendanceSchema);
