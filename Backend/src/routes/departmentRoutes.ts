import express from "express";
import * as DepartmentController from "../controllers/departmentController";

const router = express.Router();

router.post("/add-department", DepartmentController.addDepartment);

export default router;