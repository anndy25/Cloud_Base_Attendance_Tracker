const ClassInfo = require("../models/classInfoModel");

const getAllClasses = async(data) => {
    try {
        const result = await ClassInfo.find();
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

const getClass = async(id) => {
    try {
        const result = await ClassInfo.findById(id);
        return {
            data: result,
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

const addClasses = async(data) => {
    try {
        const result = await ClassInfo.insertMany(data);
        return {
            data: result,
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

const updateClass = async(id, data) => {
    try {
        const result = await ClassInfo.findByIdAndUpdate(id, { $set: data }, { new: true });
        return {
            data: result,
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

const deleteClass = async(id) => {
    try {
        await ClassInfo.findByIdAndDelete(id);
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
    getAllClasses,
    getClass,
    addClasses,
    deleteClass,
    updateClass,

}