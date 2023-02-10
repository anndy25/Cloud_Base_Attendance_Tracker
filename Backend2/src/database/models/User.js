const mongoose = require("mongoose");
const { Schema } = mongoose;
const UserSchema = new Schema({
    name: {
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
    department_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "departments",
    },
    

},{
    toJSON: {
        transform(doc, ret){
            delete ret.__v;
        }
    }
});

UserSchema.statics.isThisEmailInUse = async function(email) {
    try {
        const isUsed = await this.findOne({ email });
        if (isUsed) return false;
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }

}

const UserInfo = mongoose.model("users", UserSchema);
module.exports = UserInfo;