const { SubjectModel } = require("../../models");
const { APIError, STATUS_CODES } = require("../../../utils/app-errors");

class AdminSubjectRepository {
    constructor() {

    }
    async getAllSubjects(data) {
        try {
            const result = await SubjectModel.find();
            return {
                data: result,
                status: 200
            }

        } catch (err) {
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable To Get Subjects !!')
        }

    };

    async getSubject(id) {
        try {
            const result = await SubjectModel.findById(id);
            return {
                data: result,
                status: 200
            }

        } catch (err) {
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable To Get Subject !!')
        }
    }

    async addSubjects(data) {
        try {
            await SubjectModel.insertMany(data);
            return {
                message: "Subject Added Sucessfully !!",
                status: 200
            }

        } catch (err) {
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable To Add Subjects !!')
        }

    }

    async updateSubject(id, data) {
        try {
            await SubjectModel.findByIdAndUpdate(id, { $set: data }, { new: true });
            return {
                message: "Subject Updated Sucessfully !!",
                status: 200
            }

        } catch (err) {
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable To Update Subject !!')
        }
    }

    async deleteSubject(id) {
        try {
            await SubjectModel.findByIdAndDelete(id);
            return {
                message: "Subject Deleted Successfully!!",
                status: 200
            }
        } catch (err) {
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable To Delete Subject !!')
        }
    }

}

module.exports = AdminSubjectRepository;