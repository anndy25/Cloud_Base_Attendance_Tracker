import express from "express";
import * as ClassController from "../controllers/classController";
import * as Auth from "../middlewares/authorization"

const router = express.Router();

router.post("/add-class",Auth.adminAuth, ClassController.addClass);

router.get("/getAll",ClassController.getClasses);
router.get("/timetable",ClassController.getClassTimetable);





export default router;