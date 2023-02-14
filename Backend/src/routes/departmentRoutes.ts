import express from "express";
import * as DepartmentController from "../controllers/departmentController";
import * as Auth from "../middlewares/authorization"

const router = express.Router();

router.post("/add-department",Auth.adminAuth, DepartmentController.addDepartment);

export default router;