import express from "express";
import * as UserController from "../controllers/userController";
import * as Auth from "../middlewares/authorization"

const router = express.Router();


router.post("/registration",Auth.adminAuth, UserController.createUserAccount);
router.post("/login", UserController.userLogin);

router.get("/student/:id", UserController.findOneStudent);
router.get("/teacher/:id", UserController.findOneTeacher);


export default router;




