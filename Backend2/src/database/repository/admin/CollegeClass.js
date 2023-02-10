const { ClassModel } = require("../../models");
const { APIError, STATUS_CODES } = require("../../../utils/app-errors");

class CollegeClass {
    
    async getAllClasses(data) {
        try {
            const classes = await ClassModel.find();
            return {
                data: classes,
                status: 200
            }

        } catch (err) {
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable To Get Classes')
        }

    };

    async getClass(id) {
        try {
            const class_ = await ClassModel.findById(id);
            return {
                data: class_,
                status: 200
            }

        } catch (err) {
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable To Get Class')
        }
    }

    async addClasses(data) {
        try {
            await ClassModel.insertMany(data);
            return {
                message: "Class Added Successfully!!",
                status: 200
            }

        } catch (err) {
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable To Add Class')
        }

    }

    async updateClass(id, data) {
        try {
             await ClassModel.findByIdAndUpdate(id, { $set: data }, { new: true });
            return {
                message: "Class Updated Successfully!!",
                status: 200
            }

        } catch (err) {
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable To Update Class')
        }
    }

    async deleteClass(id) {
        try {
            await ClassModel.findByIdAndDelete(id);
            return {
                message: "Class Deleted Successfully!!",
                status: 200
            }
        }
        catch (err) {
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Find Product')
        }
    }
}
    


module.exports = CollegeClass;