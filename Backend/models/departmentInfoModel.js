const mongoose = require("mongoose");

const { Schema } = mongoose;
const DepartmentSchema = new Schema({
    departmentName: {
        type: String,
        required: true,
        unique: true,
    },
    intake: {
        type: Number,
        required: true,
    },
});

DepartmentSchema.statics.isThisDepartmentInUse = async function(name) {
    try {
        const result = await this.findOne({ name });
        if (result) return false;
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
};

const DepartmentInfo = mongoose.model("departments", DepartmentSchema);
module.exports = DepartmentInfo;