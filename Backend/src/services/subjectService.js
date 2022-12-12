const SubjectInfo = require("../models/subjectInfoModel");

const getAllSubjects = async(data) => {
    try {
        const result = await SubjectInfo.find();
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

};

const getSubject = async(id) => {
    try {
        const result = await SubjectInfo.findById(id);
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

const addSubjects = async(data) => {
    try {
        const result = await SubjectInfo.insertMany(data);
        return {
            message: "Subject added sucessfully!!",
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

const updateSubject = async(id, data) => {
    try {
        const result = await SubjectInfo.findByIdAndUpdate(id, { $set: data }, { new: true });
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

const deleteSubject = async(id) => {
    try {
        await SubjectInfo.findByIdAndDelete(id);
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
    getAllSubjects,
    getSubject,
    addSubjects,
    deleteSubject,
    updateSubject,
}