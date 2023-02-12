import { InferSchemaType, model, Schema } from "mongoose";

const adminSchema = new Schema(
    {
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
        role:{type: String, required: true}
    },
    {
      toJSON: {
        transform(doc, ret) {
          delete ret.__v;
        },
      },
    }
  );
  
  type Admin = InferSchemaType<typeof adminSchema>;
  
  export default model<Admin>("admin", adminSchema);