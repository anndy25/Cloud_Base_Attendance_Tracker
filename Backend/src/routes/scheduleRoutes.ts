import express from "express";
import * as ScheduleController from "../controllers/scheduleController";
import * as Auth from "../middlewares/authorization"

const router = express.Router();

// router.post("/add-Schedule",Auth.adminAuth, ScheduleController.addSchedule);

router.get("/class/:id", ScheduleController.getSchedule);
router.put("/setClassSchedule",Auth.adminAuth, ScheduleController.setClassSchedule)

// $$Auth.adminAuth
router.put("/assignLecture/:id", ScheduleController.assignLecture)

export default router;