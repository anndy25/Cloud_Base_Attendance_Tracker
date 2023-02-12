import express from "express";
import * as UserController from "../controllers/userController";

const router = express.Router();


router.post("/registration", UserController.createUserAccount);
router.post("/login", UserController.userLogin);


export default router;




