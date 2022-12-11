const express = require("express");
const userRouter = express.Router();
const { userSignUp } = require("../services/userService");
const validationRequestScheme = require("../middlewares/validate-request-schema");
const { basicChecks, validateFile } = require("../validators/basicChecks");


userRouter.post('/signup',
    basicChecks,
    validateFile,
    validationRequestScheme,
    async(req, res) => {

        const response = await userSignUp(req);
        return res.status(response.status).json({ response });

    }


);








module.exports = userRouter;