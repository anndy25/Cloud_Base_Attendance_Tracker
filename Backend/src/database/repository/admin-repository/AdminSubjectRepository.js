const { SubjectModel } = require("../../models");
const { APIError, STATUS_CODES } = require("../../../utils/app-errors");

class AdminSubjectRepository {
    constructor() {

    }
    async getAllSubjects( ) {
        try {
            const results = await SubjectModel.find();
            return {
                data: results,
                status: 200
            }

        } catch (err) {
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable To Get Subjects !!')
        }

    };

    async getSubject(id) {
        try {
            const result = await SubjectModel.findById({_id:id});
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
            await SubjectModel.findByIdAndUpdate({_id:id}, { $set: data }, { new: true });
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
            await SubjectModel.findByIdAndDelete({_id:id});
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