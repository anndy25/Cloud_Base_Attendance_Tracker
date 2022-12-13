const express = require("express");
const teacherRouter = express.Router();
const { teacherLoginController } = require("../services/teacher-service");
const { body } = require("express-validator");



teacherRouter.get("/controller/login",
    body("email", "Enter a valid name.").isEmail(),
    body("password", "Password filed is empty").exists(),
    async(req, res) => {


        const response = await teacherLoginController(req.body);
        return res.status(response.status).json(response);

    }


);








module.exports = teacherRouter;