const mongoose = require("mongoose");

const { Schema } = mongoose;
const ClassSchema = new Schema({

    class: {
        type: String,
            required: true
    },
    year: {
        type: String,
        required: true
    },
    departmentInfo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'departments'
    }


});

const ClassSchemaInfo = mongoose.model("classes", ClassSchema);
module.exports = ClassSchemaInfo;