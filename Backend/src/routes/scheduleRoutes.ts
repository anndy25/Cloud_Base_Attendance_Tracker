import express from "express";
import * as ScheduleController from "../controllers/scheduleController";
import * as Auth from "../middlewares/authorization"

const router = express.Router();

// router.post("/add-Schedule",Auth.adminAuth, ScheduleController.addSchedule);

router.get("/class/:id", ScheduleController.getSchedule);
// $$Auth.adminAuth
router.put("/setClassSchedule", ScheduleController.setClassSchedule)
// $$Auth.adminAuth
router.put("/assignLecture/:id", ScheduleController.assignLecture)
router.put("/updateTimeTable", ScheduleController.changeClassSchedule)

router.delete("/removeTeacher/:id", ScheduleController.removeSubjectTeacher)


export default router;