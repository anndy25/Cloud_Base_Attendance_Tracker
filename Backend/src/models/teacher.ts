import { InferSchemaType, model, Schema  } from "mongoose";



const timetable = {
    attendanceId: { type: Schema.Types.ObjectId, ref: 'attendance' },
    subjectId: { type: Schema.Types.ObjectId, ref: 'subject' },
    from: { type: String },
    to: { type: String }
}

const teacherSchema = new Schema({

    fname: { type: String, required: true },
    gender: { type: String, required: true },
    dob: { type: Date, required: true },
    image: {
        url: { type: String, required: true },
        publicId: { type: String, required: true }
    },
    phoneNumber: { type: String, required: true },
    departmentId: { type: Schema.Types.ObjectId, ref: 'department' },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    regNo: { type: String,require:true },
    schedule: {
        monday: [timetable],
        tuesday: [timetable],
        wednesday: [timetable],
        thursday: [timetable],
        friday: [timetable],
        saturday: [timetable]
    },
}, {
    toJSON: {
        transform(doc, ret) {
            delete ret.__v;
        }
    }
});

type Teacher = InferSchemaType<typeof teacherSchema>;

export default model<Teacher>("teacher", teacherSchema);