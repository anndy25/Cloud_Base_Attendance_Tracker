import { InferSchemaType, model, Schema, Types } from "mongoose";

interface EducationalInfo {
    regNo: string,
    departmentId: Types.ObjectId,
    classId: Types.ObjectId,
    rollNo?: number,
    semester?: number,
}


interface Content {
    subjectId: Types.ObjectId;
    attendanceId: Types.ObjectId;
    from: string;
    to: string
}

interface Days {
    monday?: Array<Content>;
    tuesday?: Array<Content>;
    wednesday?: Array<Content>;
    thursday?: Array<Content>;
    friday?: Array<Content>;
    saturday?: Array<Content>;
}

interface LectureInfo {
    regNo: string;
    schedule: Array<Days>

}

interface PersonalInfo {
    fname: string,
    dob: Date,
    image: {
        url: string,
        public_id: string
    },
    gender: 'male' | 'female' | 'transgender',
    phoneNumber: string,
    email: string,
    password: string,
    role: 'teacher' | 'student' | 'admin',
    isAdmin?: boolean,

}

export interface UserDocument extends Document {
    personalInfo: PersonalInfo;
    otherInfo: EducationalInfo | LectureInfo;
}



const attendanceschema = new Schema({
    personalInfo: {

        fname: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
            required: true,
        },
        dob: {
            type: Date,
        },
        image: {
            url: {
                type: String,
                required: true
            },
            public_id: {
                type: String
            }
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            required: true
        },
        isAdmin: {
            type: Boolean,
            default: false
        },
        departmentId: {
            type: Schema.Types.ObjectId,
            ref: "departments",
        },
    },


    educationalInfo: {
        regNo: { type: String },
        departmentId: { type: Schema.Types.ObjectId },
        classId: { type: Schema.Types.ObjectId },
        rollNo: { type: Number },
        semester: { type: Number },
    },
    lectureInfo:{
        regNo: {type:String},
        schedule: {
            monday: [
              {
                attendanceId: { type: Schema.Types.ObjectId, ref: 'attendances' },
                subjectId: { type: Schema.Types.ObjectId, ref: 'subjects' },
                from: { type: String },
                to: { type: String }
              }
            ],
            tuesday: [
              {
                attendanceId: { type: Schema.Types.ObjectId, ref: 'attendances' },
                subjectId: { type: Schema.Types.ObjectId, ref: 'subjects' },
                from: { type: String },
                to: { type: String }
              }
            ],
            wednesday: [
              {
                attendanceId: { type: Schema.Types.ObjectId, ref: 'attendances' },
                subjectId: { type: Schema.Types.ObjectId, ref: 'subjects' },
                from: { type: String },
                to: { type: String }
              }
            ],
            thursday: [
              {
                attendanceId: { type: Schema.Types.ObjectId, ref: 'attendances' },
                subjectId: { type: Schema.Types.ObjectId, ref: 'subjects' },
                from: { type: String },
                to: { type: String }
              }
            ],
            friday: [
              {
                attendanceId: { type: Schema.Types.ObjectId, ref: 'attendances' },
                subjectId: { type: Schema.Types.ObjectId, ref: 'subjects' },
                from: { type: String },
                to: { type: String }
              }
            ],
            saturday: [
              {
                attendanceId: { type: Schema.Types.ObjectId, ref: 'attendances' },
                subjectId: { type: Schema.Types.ObjectId, ref: 'subjects' },
                from: { type: String },
                to: { type: String }
              }
            ]
          },
    }

}, {
    toJSON: {
        transform(doc, ret) {
            delete ret.__v;
        }
    }
});

type User = InferSchemaType<typeof attendanceschema>;

export default model<User>("User", attendanceschema);