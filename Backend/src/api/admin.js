const express = require("express");
const adminRouter = express.Router();
const { body } = require("express-validator");
const IP = require('ip');
var requestIp = require('request-ip');

const { getAllClasses, deleteClass, updateClass, addClasses } = require("../services/classService");
const { getAllSubjects, getSubject, updateSubject, deleteSubject, addSubjects } = require("../services/subjectService");
const { getAllDepartments, updateDepartment, addDepartments, deleteDepartment } = require("../services/departmentService");
const { assignLecturesToTeacher } = require("../services/admin-service");

adminRouter.post(
    "/department/add",
    body("name").exists({ checkFalsy: true }),
    body("intake").exists({ checkFalsy: true }).isNumeric(),

    async(req, res) => {
        const response = await addDepartments(req.body);
        return res.status(response.status).json(response);
    }
);

adminRouter.get("/department/getAll", async(req, res) => {


    const response = await getAllDepartments();
    return res.status(response.status).json(response);
})

adminRouter.put("/department/update/:id", async(req, res) => {
    const response = await updateDepartment(req.params.id, req.body);
    return res.status(response.status).json(response);
});


adminRouter.delete("/department/delete/:id", async(req, res) => {
    const response = await deleteDepartment(req.params.id);
    return res.status(response.status).json(response);

});

adminRouter.post(
    "/subject/add",
    body("name").exists({ checkFalsy: true }),
    body("intake").exists({ checkFalsy: true }).isNumeric(),

    async(req, res) => {
        const response = await addSubjects(req.body);
        return res.status(response.status).json(response);
    }
);

// let store = {}
adminRouter.get("/subject/getAll", async(req, res) => {

    const ipAddress = requestIp.getClientIp(req);
    // const response = await getAllSubjects();
    console.log("in subject", ipAddress)
        // return res.status(response.status).json(response);
    return res.status(200).json({ ipAddress });

});

adminRouter.get("/subject/details/:id", async(req, res) => {
    const response = await getSubject(req.params.id);
    return res.status(response.status).json(response);

})

adminRouter.put("/subject/update/:id", async(req, res) => {
    const response = await updateSubject(req.params.id, req.body);
    return res.status(response.status).json(response);
});


adminRouter.delete("/subject/delete/:id", async(req, res) => {
    const response = await deleteSubject(req.params.id);
    return res.status(response.status).json(response);


});

adminRouter.post(
    "/class/add",
    body("name").exists({ checkFalsy: true }),
    body("intake").exists({ checkFalsy: true }).isNumeric(),

    async(req, res) => {
        const response = await addClasses(req.body);
        return res.status(response.status).json(response);
    }
);

adminRouter.get("/class/getAll", async(req, res) => {
    const response = await getAllClasses();
    return res.status(response.status).json(response);
})

adminRouter.put("/class/update/:id", async(req, res) => {
    const response = await updateClass(req.params.id, req.body);
    return res.status(response.status).json(response);
});


adminRouter.delete("/class/delete/:id", async(req, res) => {
    const response = await deleteClass(req.params.id);
    return res.status(response.status).json(response);


});

adminRouter.put("/lectures/added/", async(req, res) => {

    const response = await assignLecturesToTeacher(req.body);
    return res.status(response.status).json(response);


})




module.exports = adminRouter;