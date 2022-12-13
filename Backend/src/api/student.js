const express = require("express");
const studentRouter = express.Router();
const { loginStudentController } = require("../services/student-service");


studentRouter.get('/controller/login',
    async(req, res) => {

        const response = await loginStudentController(req.body);
        return res.status(response.status).json({ response });

    }


);








module.exports = studentRouter;