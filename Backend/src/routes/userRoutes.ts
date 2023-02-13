import express from "express";
import * as UserController from "../controllers/userController";
import * as Auth from "../middlewares/authorization"

const router = express.Router();


router.post("/registration",Auth.adminAuth, UserController.createUserAccount);
router.post("/login", UserController.userLogin);


export default router;




