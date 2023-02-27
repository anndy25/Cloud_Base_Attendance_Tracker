import express from "express";
import * as UserController from "../controllers/userController";
import * as Auth from "../middlewares/authorization"

const router = express.Router();


router.post("/registration",Auth.adminAuth, UserController.createUserAccount);
router.post("/login", UserController.userLogin);
router.post("/logout", UserController.logout);

router.get("/student/:id", UserController.findOneStudent);
router.get("/teacher/:id", UserController.findOneTeacher);
router.get("/allTeachers", UserController.findAllTeachers);
router.get("/allStudents", UserController.findAllStudents);

router.delete("/teacher/:id", UserController.deleteTeacher);
router.delete("/student/:id", UserController.deleteStudent);


export default router;




