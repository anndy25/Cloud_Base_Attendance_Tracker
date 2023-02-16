import express from "express";
import * as ScheduleController from "../controllers/scheduleController";
import * as Auth from "../middlewares/authorization"

const router = express.Router();

// router.post("/add-Schedule",Auth.adminAuth, ScheduleController.addSchedule);

router.get("/class/:id",Auth.adminAuth, ScheduleController.getSchedule);

router.put("/setClassSchedule",Auth.adminAuth, ScheduleController.setClassSchedule)
router.put("/assignLecture/:id",Auth.adminAuth, ScheduleController.assignLecture)

export default router;