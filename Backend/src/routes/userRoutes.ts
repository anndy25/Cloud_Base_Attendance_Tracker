import express from "express";
import * as UserController from "../controllers/userController";

const router = express.Router();

router.post("/login", UserController.userLogin);
router.post("/registration", UserController.createUserAccount);
router.post("/admin/login", UserController.adminLogin);



export default router;




