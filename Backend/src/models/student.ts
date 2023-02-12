import { InferSchemaType, model, Schema } from "mongoose";




const studentSchema = new Schema({

    fname: { type: String, required: true },
    gender: { type: String, required: true },
    dob: { type: Date, required: true },
    image: {
        url: { type: String, required: true },
        publicId: { type: String, required: true }
    },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true },


    regNo: { type: String },
    departmentId: { type: Schema.Types.ObjectId, ref: "departments" },
    classId: { type: Schema.Types.ObjectId, ref: "classes" },
    rollNo: { type: Number },
    semester: { type: Number },



}, {
    toJSON: {
        transform(doc, ret) {
            delete ret.__v;
        }
    }
});

type Student = InferSchemaType<typeof studentSchema>;
export default model<Student>("students", studentSchema);