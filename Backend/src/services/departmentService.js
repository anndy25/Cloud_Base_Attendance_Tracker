const DepartmentInfo = require("../models/departmentInfoModel");

const addDepartments = async(data) => {
    try {
        const result = await DepartmentInfo.insertMany(data);
        return {
            message: "Departments added!!",
            status: 200
        }

    } catch (error) {
        console.log(error);
        return {
            message: "Server error!!",
            status: 400
        }

    }

};

const getAllDepartments = async() => {
    try {
        const departments = await DepartmentInfo.find();
        return {
            data: departments,
            status: 200
        }

    } catch (error) {
        console.log(error);
        return {
            message: "Server error!!",
            status: 400
        }

    }
}
const getDepartment = async(id) => {
    try {
        const department = await DepartmentInfo.findById(id);
        return {
            data: department,
            status: 200
        }

    } catch (error) {
        console.log(error);
        return {
            message: "Server error!!",
            status: 400
        }
    }
}

const updateDepartment = async(id, data) => {
    try {
        let newDepartmentInfo = await DepartmentInfo.findByIdAndUpdate(id, { $set: data }, { new: true });
        return {
            data: newDepartmentInfo,
            status: 200
        }

    } catch (error) {
        console.log(error);
        return {
            message: "Server error!!",
            status: 400
        }
    }

}

const deleteDepartment = async(id) => {
    try {
        await DepartmentInfo.findByIdAndDelete(id);
        return {
            message: "Department deleted successfully!!",
            status: 200
        }
    } catch (error) {
        console.log(error);
        return {
            message: "Server error!!",
            status: 400
        }
    }

}


module.exports = {
    getAllDepartments,
    getDepartment,
    updateDepartment,
    addDepartments,
    deleteDepartment,
};