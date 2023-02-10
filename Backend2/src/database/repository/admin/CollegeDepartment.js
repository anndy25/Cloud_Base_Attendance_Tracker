const { DepartmentModel } = require("../../models");
const { APIError, STATUS_CODES } = require("../../../utils/app-errors");

class CollegeDepartment {
    async addDepartments(data) {
        try {
            await DepartmentModel.insertMany(data);
            return {
                message: "Departments Added Successfully !!",
                status: 200,
            };
        } catch (err) {
            throw APIError(
                "API Error",
                STATUS_CODES.INTERNAL_ERROR,
                "Unable To Add Departments !!"
            );
        }
    }

    async getAllDepartments() {
        try {
            const departments = await DepartmentModel.find();
            return {
                data: departments,
                status: 200,
            };
        } catch (err) {
            throw APIError(
                "API Error",
                STATUS_CODES.INTERNAL_ERROR,
                "Unable To Get Departments !!"
            );
        }
    }
    async getDepartment(id) {
        try {
            const department = await DepartmentModel.findById(id);
            return {
                data: department,
                status: 200,
            };
        } catch (err) {
            throw APIError(
                "API Error",
                STATUS_CODES.INTERNAL_ERROR,
                "Unable To Update Department !!"
            );
        }
    }

    async updateDepartment(id, data) {
        try {
            let newDepartmentInfo = await DepartmentModel.findByIdAndUpdate(
                id,
                { $set: data },
                { new: true }
            );
            return {
                data: newDepartmentInfo,
                status: 200,
            };
        } catch (err) {
            throw APIError(
                "API Error",
                STATUS_CODES.INTERNAL_ERROR,
                "Unable To Update Department !!"
            );
        }
    }

    async deleteDepartment(id) {
        try {
            await DepartmentModel.findByIdAndDelete(id);
            return {
                message: "Department Deleted Successfully!!",
                status: 200,
            };
        } catch (err) {
            throw APIError(
                "API Error",
                STATUS_CODES.INTERNAL_ERROR,
                "Unable TO Delete Department !!"
            );
        }
    }
}

module.exports = CollegeDepartment;
